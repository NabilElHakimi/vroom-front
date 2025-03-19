import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../../model/AuthResponse';
import { User } from '../../model/User';
import {UserDetails} from '../../model/UserDetails';
import {Profile} from '../../model/Profile';
import {Register} from '../../model/Register';
import {ActivateAccount} from '../../model/ActivateAccount';

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

  logout(): Observable<any> {
    return this.http.post(
      `${environment.API_URL}/auth/logout`, {} , { withCredentials: true });
  }

  getProfile(username: string | null): Observable<Profile> {
    const params = new HttpParams().set('username', username || '');
    return this.http.get<Profile>(`${environment.API_URL}/user/profile`, { params, withCredentials: true });
  }

  register(registerForm: Register) {
    return this.http.post(`${environment.API_URL}/auth/register`, registerForm);

  }

  resendCode(username: string | null) {
    return this.http.post(`${environment.API_URL}/auth/resend?username=${username}` , {});
  }

  activateAccount(activateAccount : ActivateAccount) : Observable<any> {
       return this.http.post(`${environment.API_URL}/auth/validate`, activateAccount);
  }

}
