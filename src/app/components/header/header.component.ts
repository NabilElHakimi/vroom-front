import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeService} from '../../services/theme-service/theme.service';
import {Router} from '@angular/router';
import {LogoutAlertComponentComponent} from '../logout-alert-component/logout-alert-component.component';
import {LeaderPropositionAlertComponent} from '../leader-proposition-alert/leader-proposition-alert.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LogoutAlertComponentComponent, LeaderPropositionAlertComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private themeService: ThemeService , private route :  Router) {}

  mobileMenuOpen = false;
  logoutAlert   = false;
  leaderPropositionAlert = false;


  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  logout(): void {
    this.logoutAlert = true;
  }

  leaderAlert(): void {
    this.leaderPropositionAlert = true;
  }



}
