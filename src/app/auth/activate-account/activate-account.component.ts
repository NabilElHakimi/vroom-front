/*
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service/auth.service';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import {ActivateAccount} from '../../model/ActivateAccount';
import {tap} from 'rxjs';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent implements OnInit {

  username: string | null = '';
  code: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: SuccesstoastService ,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  activateAccount() {
    const activateAccount: ActivateAccount = { username: this.username, code: this.code };
    this.authService.activateAccount(activateAccount).pipe(
      tap((res : any) => {
        if(res.message == "Account activated successfully") {
          this.toast.showToast(res.message , 'success');
          this.router.navigate(['/login']);
          return;
        }
        this.toast.showToast(res.message , 'error');

      })
    ).subscribe();
  }


  resendCode() {
    this.authService.resendCode(this.username).subscribe(
      (response) => {
        console.log(response);  // Log the response from the API
      },
      (error) => {
        console.error('Error occurred:', error);  // Log the error if the API request fails
      }
    );
  }







}
*/
