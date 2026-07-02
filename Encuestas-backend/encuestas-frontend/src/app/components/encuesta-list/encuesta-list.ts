import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta } from '../../models/encuesta.interface';

@Component({
  selector: 'app-encuesta-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './encuesta-list.html',
  styleUrl: './encuesta-list.css'
})
export class EncuestaList implements OnInit {
  private readonly encuestaService = inject(EncuestaService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  encuestas: Encuesta[] = [];
  filtro = '';

  get isAdmin(): boolean { return this.auth.isAdmin(); }
  get isLoggedIn(): boolean { return this.auth.isLoggedIn(); }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.encuestaService.listar(this.filtro || undefined).subscribe({
      next: (data) => { this.encuestas = data; this.cdr.detectChanges(); }
    });
  }

  eliminar(e: Encuesta): void {
    if (!confirm('¿Eliminar "' + e.titulo + '"? Esta acción no se puede deshacer.')) return;
    this.encuestaService.eliminar(e.id).subscribe({
      next: () => {
        this.encuestas = this.encuestas.filter(x => x.id !== e.id);
        this.cdr.detectChanges();
      },
      error: (err) => alert('Error: ' + (err.error?.mensaje || err.message))
    });
  }
}
