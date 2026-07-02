import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-encuesta-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './encuesta-form.html',
  styleUrl: './encuesta-form.css'
})
export class EncuestaForm {
  private readonly encuestaService = inject(EncuestaService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  titulo = '';
  descripcion = '';
  opciones: string[] = [''];
  error = '';
  guardando = false;

  agregarOpcion(): void {
    this.opciones.push('');
  }

  eliminarOpcion(i: number): void {
    if (this.opciones.length > 1) {
      this.opciones.splice(i, 1);
    }
  }

  trackIndex(i: number): number {
    return i;
  }

  guardar(): void {
    this.error = '';
    this.guardando = true;
    const opcionesValidas = this.opciones.filter(o => o.trim().length > 0);
    if (opcionesValidas.length < 2) {
      this.error = 'Debes agregar al menos 2 opciones';
      this.guardando = false;
      this.cdr.detectChanges();
      return;
    }
    this.encuestaService.crear({
      titulo: this.titulo,
      descripcion: this.descripcion,
      opciones: opcionesValidas
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al crear la encuesta';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
