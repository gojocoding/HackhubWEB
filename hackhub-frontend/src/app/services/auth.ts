import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      {
        username: username,
        password: password
      }
    );
  }
  register(user: {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    paymentInfo: string;
  }): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      { responseType: 'text' }
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  getUserRole(): string | null {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload.role;
    } catch {
      return null;
    }
  }
}
