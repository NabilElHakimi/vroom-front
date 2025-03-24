import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service/auth.service';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import {tap} from 'rxjs';
import {ActivateAccount} from '../../model/ActivateAccount';
import {LodaingComponentComponent} from "../../components/lodaing-component/lodaing-component.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  standalone: true,
    imports: [
        FormsModule,
        LodaingComponentComponent,
        NgIf
    ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent implements OnInit {

  username: string = '';
  code: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: SuccesstoastService ,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = <string>this.route.snapshot.paramMap.get('username');
  }

  activateAccount() {
    this.loading = true;
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
    this.loading = false;
  }


  resendCode() {

    this.loading = true;

    this.authService.resendCode(this.username).subscribe(
      (response) => {
         this.toast.showToast('Code sent successfully' , 'success');
        this.loading = false;

      },
      (error) => {
        this.toast.showToast('Error sending code' , 'error');
        this.loading = false;

      }
    );


  }
}
