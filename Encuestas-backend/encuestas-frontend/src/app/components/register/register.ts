import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  nombre = '';
  email = '';
  password = '';
  error = '';

  register(): void {
    this.error = '';
    this.auth.registro({ nombre: this.nombre, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.error = err.error?.mensaje || 'Error al registrarse'
    });
  }
}
