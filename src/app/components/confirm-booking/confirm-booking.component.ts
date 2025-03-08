import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Reservation} from '../../model/Reservation';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-confirm-booking',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.css'
})
export class ConfirmBookingComponent {
  @Input() reservation: Reservation = {};
  @Output() dismissed = new EventEmitter<void>();
  @Output() detailsViewed = new EventEmitter<number>();

  calculateDays(startDate?: string, endDate?: string): number {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the time difference in milliseconds
    const diffTime = Math.abs(end.getTime() - start.getTime());

    // Convert to days and add 1 to include both the start and end dates
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  }

  closeAlert(): void {
    this.dismissed.emit();
  }

  viewDetails(id?: number): void {
    if (id) {
      this.detailsViewed.emit(id);
    }
  }
}
