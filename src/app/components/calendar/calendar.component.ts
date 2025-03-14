import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Reservation} from '../../model/Reservation';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {ReservtionService} from '../../services/reservation-service/reservtion.service';
import {LodaingComponentComponent} from "../lodaing-component/lodaing-component.component";
import {ConfirmBookingComponent} from '../confirm-booking/confirm-booking.component';

@Component({
  selector: 'app-calendar',
  imports: [NgClass, NgForOf, LodaingComponentComponent, NgIf, ConfirmBookingComponent, ConfirmBookingComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {

  constructor(private calendarService: ReservtionService,
              private toast: SuccesstoastService) {
    this.generateCalendar();
  }

  reservationModel: Reservation = {
    vehicleId: "",
    startDate: "",
    endDate: ""
  }

  showConfirmation: boolean = false;
  confirmedReservation: Reservation = {};

  calendarIsOpen: boolean = true;

  @Input() vehicleIDInputs: number = 0;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  today: Date = new Date();
  isLoading: boolean = false;

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay();

    this.daysInMonth = Array(startDay).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(i);
    }
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  selectDay(day: number | null): void {
    if (day && !this.isDayDisabled(day)) {
      const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

      if (this.selectedStartDate === null || this.selectedEndDate !== null) {
        this.selectedStartDate = selectedDate;
        this.selectedEndDate = null;
      } else {
        this.selectedEndDate = selectedDate;
        if (this.selectedStartDate > this.selectedEndDate) {
          [this.selectedStartDate, this.selectedEndDate] = [this.selectedEndDate, this.selectedStartDate];
        }
        console.log(`Selected period: ${this.selectedStartDate.toDateString()} to ${this.selectedEndDate.toDateString()}`);
      }
    }
  }

  isDayInSelectedPeriod(day: number | null): boolean {
    if (day === null || this.selectedStartDate === null) return false;

    const currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

    if (this.selectedEndDate === null) {
      return currentDate.getTime() === this.selectedStartDate.getTime();
    } else {
      return currentDate >= this.selectedStartDate && currentDate <= this.selectedEndDate;
    }
  }

  isDayDisabled(day: number | null): boolean {
    if (day === null) return true;

    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const dayDate = new Date(currentYear, currentMonth, day);

    return dayDate < new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }

  bookVehicle() {
    this.isLoading = true;
    if (this.selectedStartDate && this.selectedEndDate) {
      this.calendarService.addReservation(this.vehicleIDInputs, this.selectedStartDate, this.selectedEndDate)
        .subscribe((response) => {
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
        });
    }
  }

  hideConfirmation() {
    this.showConfirmation = false;
    this.closeModal();
  }

  navigateToDetails(reservationId: number | undefined) {
    console.log(`Navigating to details for reservation ${reservationId}`);
    this.showConfirmation = false;
    this.closeModal();
  }

}
