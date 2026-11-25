import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name = '';
  surname = '';
  username = '';
  email = '';
  password = '';
  paymentInfo = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onRegister(): void {
    this.errorMessage = '';

    this.authService.register({
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password,
      paymentInfo: this.paymentInfo
    }).subscribe({
      next: () => {
        console.log('Registrazione completata!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);

        if (error.status === 400) {
          this.errorMessage = 'I dati inseriti non sono validi o l’utente esiste già.';
        } else if (error.status === 0) {
          this.errorMessage = 'Impossibile contattare il server. Riprova più tardi.';
        } else {
          this.errorMessage = 'Si è verificato un errore durante la registrazione.';
        }
        this.cdr.markForCheck();
      }
    });

  }
}
