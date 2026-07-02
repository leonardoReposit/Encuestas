import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly auth = inject(AuthService);

  get isLoggedIn(): boolean { return this.auth.isLoggedIn(); }
  get isAdmin(): boolean { return this.auth.isAdmin(); }
  get nombre(): string | null { return this.auth.getNombre(); }
  get rol(): string | null { return this.auth.getRol(); }

  logout(): void {
    this.auth.logout();
    window.location.href = '/login';
  }
}
