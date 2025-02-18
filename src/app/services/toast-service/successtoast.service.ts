import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccesstoastService {
  private messageSource = new BehaviorSubject<{ message: string | null; type: string } | null>(null);
  message$ = this.messageSource.asObservable();

  showToast(message: string | null, type: string = 'error') {
    if (message) {
      this.messageSource.next({ message, type });
      setTimeout(() => {
        this.messageSource.next(null);
      }, 5000);
    } else {
      this.messageSource.next(null);
    }
  }
}
