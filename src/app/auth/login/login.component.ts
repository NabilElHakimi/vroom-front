import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { ThemeService } from '../../services/theme-service/theme.service';
import { User } from '../../model/User';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toast: SuccesstoastService,
    private themeService: ThemeService
  ) {}

  username: string = '';
  password: string = '';


  signIn() {
    const user: User = { username: this.username, password: this.password };

    this.authService.login(user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('role', res.role);
          this.toast.showToast('Login Successful', 'success');
          this.router.navigate(['/client/home']);
        } else {
          this.toast.showToast(res.message, 'error');
        }
      }),
      catchError((error) => {
        this.toast.showToast('An error occurred. Please try again.', 'error');
        return of(null);
      })
    ).subscribe();
  }


}
