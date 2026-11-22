
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HackathonService } from '../../services/hackathon';

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

  constructor(
    private hackathonService: HackathonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
