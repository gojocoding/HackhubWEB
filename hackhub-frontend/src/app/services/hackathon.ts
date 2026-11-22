import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackathonService {

  private apiUrl = 'http://localhost:8080/api/hackathons';

  constructor(private http: HttpClient) {}

  getAllHackathons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
