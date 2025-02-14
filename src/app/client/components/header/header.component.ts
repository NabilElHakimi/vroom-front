import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeService} from '../../../services/theme-service/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }





}
