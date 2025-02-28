import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';

@Component({
  selector: 'app-logout-alert-component',
  imports: [
    NgIf
  ],
  templateUrl: './logout-alert-component.component.html',
  styleUrl: './logout-alert-component.component.css'
})
export class LogoutAlertComponentComponent {

  constructor(private authService : AuthService ,
              private  router : Router ,
            private toast: SuccesstoastService
  ) {
  }

  @Input() logoutAlert = false;
  @Output() logoutAlertChange = new EventEmitter<boolean>();

  closeAlert() {
    this.logoutAlert = false;
    this.logoutAlertChange.emit(this.logoutAlert);
  }


  logout() {
    this.logoutAlert = false;
    this.logoutAlertChange.emit(this.logoutAlert);

    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        sessionStorage.clear();
        this.router.navigate(['/login']);
        this.toast.showToast('Logged out successfully', 'success');
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }


}
