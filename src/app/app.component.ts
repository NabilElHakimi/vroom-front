import { Component } from '@angular/core';
import { SuccesstoastService } from './services/toast-service/successtoast.service';
import { NgIf } from '@angular/common';
import { SuccessToastComponent } from './components/success-toast/success-toast.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SuccessToastComponent, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vroom-front';
  toastMessage: { message: string | null; type: string } | null = null;

  constructor(private toastService: SuccesstoastService) {
    this.toastService.message$.subscribe(toast => {
      this.toastMessage = toast;
    });
  }
}
