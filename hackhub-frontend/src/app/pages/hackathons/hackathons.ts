
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HackathonService } from '../../services/hackathon';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-hackathons',
  imports: [RouterLink],
  templateUrl: './hackathons.html',
  styleUrl: './hackathons.css',
})
export class Hackathons implements OnInit {

  hackathons: any[] = [];
  loading = true;
  error = '';
  userRole: string | null = null;

  constructor(
    private hackathonService: HackathonService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log('Ruolo nella pagina Hackathons:', this.userRole);
    this.hackathonService.getAllHackathons().subscribe({
      next: (data) => {
        console.log('Hackathon ricevuti:', data);
        this.hackathons = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore caricamento hackathon:', err);
        this.error = 'Impossibile caricare gli hackathon.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
