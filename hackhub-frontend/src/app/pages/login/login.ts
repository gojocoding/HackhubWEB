import { Component, ChangeDetectorRef } from '@angular/core';
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
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onLogin(): void {
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token);

        console.log('Login completato!');
        console.log('Ruolo utente:', this.authService.getUserRole());

        this.router.navigate(['/hackathons']);
      },
      error: (error) => {
        console.error('Errore durante il login:', error);

        if (error.status === 401) {
          this.errorMessage = 'Username o password non corretti.';
        } else if (error.status === 0) {
          this.errorMessage = 'Impossibile contattare il server. Riprova più tardi.';
        } else {
          this.errorMessage = 'Si è verificato un errore durante il login.';
        }
        this.cdr.markForCheck();
      }
    });
  }
}
