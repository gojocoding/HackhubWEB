
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token);
        console.log('Login completato! Token salvato.');
        sessionStorage.setItem('token', response.token);

        console.log('Ruolo utente:', this.authService.getUserRole());

        this.router.navigate(['/hackathons']);
        this.router.navigate(['/hackathons']);
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
      }
    });
  }
}
