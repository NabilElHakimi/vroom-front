import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ThemeService} from '../../services/theme-service/theme.service';
import {Register} from '../../model/Register';
import {FormsModule} from '@angular/forms';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {AuthService} from '../../services/auth-service/auth.service';
import {LodaingComponentComponent} from '../../components/lodaing-component/lodaing-component.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    LodaingComponentComponent,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm : Register = {}
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toast : SuccesstoastService ,
              private authService : AuthService ,
              private router:Router) { }

  onSubmit() {


    if (this.registerForm.password !== this.confirmPassword) {
      this.toast.showToast('Passwords do not match' , "error");
      return;
    }

    if(this.registerForm.password === undefined || this.registerForm.email === undefined || this.registerForm.first_name === undefined || this.registerForm.last_name === undefined || this.registerForm.username === undefined){
      this.toast.showToast('Please fill all fields' , "error");
      return;
    }

    if(this.registerForm.password.length < 8){
      this.toast.showToast('Password must be at least 8 characters long' , "error");
      return;
    }

    if(this.registerForm.username.length < 4){
      this.toast.showToast('Username must be at least 4 characters long' , "error");
      return;
    }

    if (!this.registerForm.email.includes('@') || !this.registerForm.email.includes('.')) {
      this.toast.showToast('Invalid email address' , "error");
      return;
    }

    if(this.registerForm.first_name.length < 2){
      this.toast.showToast('First name must be at least 2 characters long' , "error");
      return;
    }

    if(this.registerForm.last_name.length < 2){
      this.toast.showToast('Last name must be at least 2 characters long' , "error");
      return;
    }


    this.loading = true;


    this.authService.register(this.registerForm).subscribe(
      () => {
        this.toast.showToast('Registration successful' , "success");
        this.router.navigate(['/activate-account/' + this.registerForm.username]);
        this.loading = false;
      }
    );

  }

}
