
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  editError = '';

  constructor(
    private hackathonService: HackathonService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    this.hackathonService.getAllHackathons().subscribe({
      next: (data) => {
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

  editHackathonName(hackathon: any): void {
    this.editError = '';

    const newName = prompt(
      'Inserisci il nuovo nome dell’hackathon:',
      hackathon.name
    );

    if (newName === null || newName.trim() === '') {
      return;
    }

    this.hackathonService.updateHackathonName(
      hackathon.id,
      newName.trim()
    ).subscribe({
      next: () => {
        hackathon.name = newName.trim();
        this.cdr.detectChanges();
        alert('Nome hackathon aggiornato con successo!');
      },
      error: (err) => {
        console.error('Errore modifica hackathon:', err);
        this.editError = 'Impossibile modificare il nome dell’hackathon. Riprova.';
        this.cdr.detectChanges();
      }
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
