import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Reservation } from '../../model/Reservation';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { ReservtionService } from '../../services/reservation-service/reservtion.service';
import { LodaingComponentComponent } from "../lodaing-component/lodaing-component.component";
import { ConfirmBookingComponent } from '../confirm-booking/confirm-booking.component';
import { ReservationRes } from '../../model/ReservationRes';

@Component({
  selector: 'app-calendar',
  imports: [NgClass, NgForOf, LodaingComponentComponent, NgIf, ConfirmBookingComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private reservationService: ReservtionService,
    private toast: SuccesstoastService
  ) {
    this.generateCalendar();
  }

  // Reservation-related properties
  reservedDates: Date[] = [];
  reservation: ReservationRes = {};

  // Calendar-related properties
  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Selection and state properties
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  today: Date = new Date();
  isLoading: boolean = false;
  showConfirmation: boolean = false;
  confirmedReservation: Reservation = {};
  calendarIsOpen: boolean = true;

  // Input and output
  @Input() vehicleIDInputs: number = 0;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    // Fetch reservations for the specific vehicle
    this.fetchReservations();
  }

  private fetchReservations(): void {
    this.reservationService.getReservationsByCarId(this.vehicleIDInputs)
      .subscribe({
        next: (response: ReservationRes[]) => {
          // Filter active reservations (not canceled or rejected)
          const activeReservations = response.filter(
            reservation =>
              reservation.status !== 'CANCELED' &&
              reservation.status !== 'REJECTED'
          );

          // Convert to reserved dates
          this.reservedDates = this.getDatesBetweenReservations(activeReservations);
        },
        error: (error) => {
          console.error('Error fetching reservations', error);
          this.toast.showToast('Failed to load reservations', 'error');
        }
      });
  }

  // Convert reservation periods to individual dates
  private getDatesBetweenReservations(reservations: ReservationRes[]): Date[] {
    const reservedDates: Date[] = [];

    reservations.forEach(reservation => {
      if (reservation.startDate && reservation.endDate) {
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          reservedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    return reservedDates;
  }

  // Determine if a day is disabled (past or reserved)
  isDayDisabled(day: number | null): boolean {
    if (day === null) return true;

    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const dayDate = new Date(currentYear, currentMonth, day);

    // Check if date is before today or already reserved
    return dayDate < this.today || this.isDayReserved(day);
  }

  // Check if a specific day is reserved
  isDayReserved(day: number | null): boolean {
    if (day === null) return false;

    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const dayDate = new Date(currentYear, currentMonth, day);

    return this.reservedDates.some(reservedDate =>
      reservedDate.getFullYear() === dayDate.getFullYear() &&
      reservedDate.getMonth() === dayDate.getMonth() &&
      reservedDate.getDate() === dayDate.getDate()
    );
  }

  // Generate calendar for current month
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay();

    // Fill with null for empty days before the first of the month
    this.daysInMonth = Array(startDay).fill(null);

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(i);
    }
  }

  // Navigate to previous month
  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.fetchReservations(); // Refetch reservations for the new month
  }

  // Navigate to next month
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.fetchReservations(); // Refetch reservations for the new month
  }

  // Get current month and year for display
  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // Select a day for reservation
  selectDay(day: number | null): void {
    if (day === null || this.isDayDisabled(day)) {
      this.toast.showToast('This date is not available', 'error');
      return;
    }

    const selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );

    // Reset or set start/end dates
    if (this.selectedStartDate === null || this.selectedEndDate !== null) {
      this.selectedStartDate = selectedDate;
      this.selectedEndDate = null;
    } else {
      // Validate end date selection
      if (this.isDayReserved(day)) {
        this.toast.showToast('Selected end date is already reserved', 'error');
        return;
      }

      this.selectedEndDate = selectedDate;

      // Ensure start date is before end date
      if (this.selectedStartDate > this.selectedEndDate) {
        [this.selectedStartDate, this.selectedEndDate] =
          [this.selectedEndDate, this.selectedStartDate];
      }

      // Check if any dates in the range are reserved
      if (this.checkReservedInRange(this.selectedStartDate, this.selectedEndDate)) {
        this.toast.showToast('Some dates in the selected range are already reserved', 'error');
        this.selectedStartDate = null;
        this.selectedEndDate = null;
      }
    }
  }

  // Check if any dates in the range are reserved
  private checkReservedInRange(start: Date, end: Date): boolean {
    let currentDate = new Date(start);
    while (currentDate <= end) {
      if (this.isDayReserved(currentDate.getDate())) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  }

  // Check if day is in selected period
  isDayInSelectedPeriod(day: number | null): boolean {
    if (day === null || this.selectedStartDate === null) return false;

    const currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );

    if (this.selectedEndDate === null) {
      return currentDate.getTime() === this.selectedStartDate.getTime();
    } else {
      return currentDate >= this.selectedStartDate && currentDate <= this.selectedEndDate;
    }
  }

  // Book the vehicle
  bookVehicle(): void {
    if (!this.selectedStartDate || !this.selectedEndDate) {
      this.toast.showToast('Please select start and end dates', 'error');
      return;
    }

    // Additional validation to prevent booking reserved dates
    if (this.checkReservedInRange(this.selectedStartDate, this.selectedEndDate)) {
      this.toast.showToast('Some dates in the selected range are already reserved', 'error');
      return;
    }

    this.isLoading = true;
    this.reservationService.addReservation(
      this.vehicleIDInputs,
      this.selectedStartDate,
      this.selectedEndDate
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.confirmedReservation = {
          id: response.id,
          vehicleId: this.vehicleIDInputs.toString(),
          startDate: this.selectedStartDate?.toISOString(),
          endDate: this.selectedEndDate?.toISOString(),
          status: 'Confirmed',
          totalPrice: response.totalPrice
        };

        this.showConfirmation = true;
        this.toast.showToast('Reservation successful', 'success');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Reservation failed', error);
        this.toast.showToast('Reservation failed', 'error');
      }
    });
  }

  // Close modal and reset confirmation
  hideConfirmation(): void {
    this.showConfirmation = false;
    this.closeModal();
  }

  // Close modal
  closeModal(): void {
    this.close.emit();
  }

  // Navigate to reservation details (optional)
  navigateToDetails(reservationId: number | undefined): void {
    console.log(`Navigating to details for reservation ${reservationId}`);
    this.showConfirmation = false;
    this.closeModal();
  }
}
