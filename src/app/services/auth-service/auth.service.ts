import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../../model/AuthResponse';
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, user, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }


  refreshToken(): Observable<any> {
    return this.http.post(
      `${environment.API_URL}/auth/refresh-token`, {}, { withCredentials: true }
    );
  }

}
