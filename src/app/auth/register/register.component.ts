import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThemeService} from '../../services/theme-service/theme.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private themeService: ThemeService) {
  }

}
