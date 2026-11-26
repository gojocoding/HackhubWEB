import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToAccess(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/hackathons']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
