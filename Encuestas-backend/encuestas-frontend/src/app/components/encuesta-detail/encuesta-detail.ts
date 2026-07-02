import { ChangeDetectorRef, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EncuestaService } from '../../services/encuesta.service';
import { VotoService } from '../../services/voto.service';
import { AuthService } from '../../services/auth.service';
import { Encuesta } from '../../models/encuesta.interface';
import { Opcion } from '../../models/opcion.interface';
import { Resultado } from '../../models/resultado.interface';

@Component({
  selector: 'app-encuesta-detail',
  imports: [RouterLink],
  templateUrl: './encuesta-detail.html',
  styleUrl: './encuesta-detail.css'
})
export class EncuestaDetail implements OnInit, OnDestroy {
  private readonly encuestaService = inject(EncuestaService);
  private readonly votoService = inject(VotoService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();

  encuesta!: Encuesta;
  opciones: Opcion[] = [];
  resultados: Resultado[] = [];
  mensaje = '';
  error = '';

  ngOnInit(): void {
    console.log('isAdmin:', this.isAdmin, 'isLoggedIn:', this.isLoggedIn, 'rol:', this.authService.getRol());
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id')!;
      this.cargarEncuesta(id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarEncuesta(id: string): void {
    this.encuesta = null!;
    this.opciones = [];
    this.resultados = [];
    this.mensaje = '';
    this.error = '';

    this.encuestaService.obtener(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => {
        this.encuesta = e;
        this.cdr.detectChanges();
        this.cargarOpciones();
        if (this.isLoggedIn) this.cargarResultados();
      },
      error: () => this.router.navigate(['/'])
    });
  }

  private cargarOpciones(): void {
    this.encuestaService.listarOpciones(this.encuesta.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { this.opciones = data; this.cdr.detectChanges(); },
      error: (err) => {
        console.error('Error al cargar opciones:', err);
        this.error = 'Error al cargar opciones: ' + (err.error?.mensaje || err.message);
        this.cdr.detectChanges();
      }
    });
  }

  private cargarResultados(): void {
    this.votoService.resultados(this.encuesta.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { this.resultados = data; this.cdr.detectChanges(); }
    });
  }

  votar(opcionId: string): void {
    this.mensaje = '';
    this.error = '';
    this.votoService.votar(this.encuesta.id, { opcionId }).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensaje = '¡Voto registrado correctamente!';
        this.cargarResultados();
      },
      error: (err) => this.error = err.error?.mensaje || 'Error al votar'
    });
  }

  activar(): void {
    this.encuestaService.cambiarEstado(this.encuesta.id, 'activa').pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => { this.encuesta = e; this.mensaje = 'Encuesta activada'; },
      error: (err) => this.error = err.error?.mensaje || 'Error al activar'
    });
  }

  finalizar(): void {
    this.encuestaService.cambiarEstado(this.encuesta.id, 'finalizada').pipe(takeUntil(this.destroy$)).subscribe({
      next: (e) => { this.encuesta = e; this.mensaje = 'Encuesta finalizada'; },
      error: (err) => this.error = err.error?.mensaje || 'Error al finalizar'
    });
  }

  eliminar(): void {
    if (!confirm('¿Estás seguro de eliminar esta encuesta?')) return;
    this.encuestaService.eliminar(this.encuesta.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.error = err.error?.mensaje || 'Error al eliminar'
    });
  }

  get isAdmin(): boolean { return this.authService.isAdmin(); }
  get isLoggedIn(): boolean { return this.authService.isLoggedIn(); }
  get esActiva(): boolean { return this.encuesta?.estado === 'activa'; }
  get esBorrador(): boolean { return this.encuesta?.estado === 'borrador'; }
  get esFinalizada(): boolean { return this.encuesta?.estado === 'finalizada'; }

  get maxVotos(): number {
    return Math.max(...this.resultados.map(r => r.totalVotos), 1);
  }

  get totalVotos(): number {
    return this.resultados.reduce((s, r) => s + r.totalVotos, 0);
  }
}
