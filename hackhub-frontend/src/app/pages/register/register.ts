import { Component } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
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
      }
    });
  }
}
