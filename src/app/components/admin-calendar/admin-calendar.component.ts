import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRes } from '../../model/ReservationRes';
import { VehicleService } from '../../services/vehicle-service/vehicle.service';
import { ReservtionService } from '../../services/reservation-service/reservtion.service';
import {LodaingComponentComponent} from '../lodaing-component/lodaing-component.component';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LodaingComponentComponent,
  ]
})
export class AdminCalendarComponent implements OnInit {
  @Input() vehicleIDInputs!: number;
  @Output() close = new EventEmitter<void>();

  // Calendar-related properties
  currentDate: Date = new Date();
  weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: (number | null)[] = [];

  // Reservation-related properties
  reservations: ReservationRes[] = [];
  isLoading: boolean = false;
  showReservationDetails: boolean = false;
  selectedReservation: ReservationRes | null = null;

  // Status priority (for coloring days with multiple statuses)
  private statusPriority: Record<string, number> = {
    'PENDING': 1,
    'APPROVED': 2,
    'COMPLETED': 3,
    'CANCELLED': 4
  };

  constructor(
    private vehicleService: VehicleService,
    private reservationService: ReservtionService
  ) {}

  ngOnInit() {
    // Ensure vehicleIDInputs is a valid number before proceeding
    if (!this.vehicleIDInputs) {
      console.error('No vehicle ID provided');
      return;
    }

    this.generateCalendar();
    this.fetchReservations();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    // Calculate days to fill before first day of month
    const startingDay = firstDayOfMonth.getDay() || 7; // Adjust for Monday as first day
    const daysArray: (number | null)[] = Array(startingDay - 1).fill(null);

    // Add days of the month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysArray.push(i);
    }

    // Fill remaining cells if needed
    const totalCells = Math.ceil(daysArray.length / 7) * 7;
    while (daysArray.length < totalCells) {
      daysArray.push(null);
    }

    this.daysInMonth = daysArray;
  }

  fetchReservations() {
    // Use non-null assertion since we've already checked in ngOnInit
    this.isLoading = true;
    this.reservationService.getReservationsByCarId(this.vehicleIDInputs)
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.reservations = [];
        }
      });
  }

  getReservationsForDay(day: number | null): ReservationRes[] {
    if (!day) return [];

    return this.reservations.filter(res => {
      if (!res.startDate || !res.endDate) return false;

      const startDate = new Date(res.startDate);
      const endDate = new Date(res.endDate);
      const currentMonth = this.currentDate.getMonth();
      const currentYear = this.currentDate.getFullYear();

      // Check if the reservation spans this specific day
      return this.isDayInReservationRange(startDate, endDate, currentMonth, currentYear, day);
    });
  }

  private isDayInReservationRange(
    startDate: Date,
    endDate: Date,
    currentMonth: number,
    currentYear: number,
    day: number
  ): boolean {
    // Normalize dates to handle timezone issues
    const reservationStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const reservationEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const checkDate = new Date(currentYear, currentMonth, day);

    return checkDate >= reservationStart && checkDate <= reservationEnd;
  }

  isDayReserved(day: number | null): boolean {
    return this.getReservationsForDay(day).length > 0;
  }

  /**
   * Returns the most important status for a day based on priority
   * PENDING > APPROVED > COMPLETED > CANCELLED
   */
  getDayHighestPriorityStatus(day: number | null): string {
    if (!day) return '';

    const reservations = this.getReservationsForDay(day);
    if (reservations.length === 0) return '';

    // Sort statuses by priority (lower number = higher priority)
    const statuses = reservations
      .map(res => res.status || '')
      .filter(status => status !== '')
      .sort((a, b) => {
        return (this.statusPriority[a] || 999) - (this.statusPriority[b] || 999);
      });

    return statuses[0] || '';
  }

  /**
   * Returns an array of unique statuses for a day
   */
  getUniqueStatusesForDay(day: number | null): string[] {
    if (!day) return [];

    const reservations = this.getReservationsForDay(day);
    if (reservations.length === 0) return [];

    // Get unique statuses
    const statusSet = new Set<string>();
    reservations.forEach(res => {
      if (res.status) {
        statusSet.add(res.status);
      }
    });

    return Array.from(statusSet);
  }

  selectDay(day: number | null) {
    if (!day) return;

    const reservationsOnDay = this.getReservationsForDay(day);
    if (reservationsOnDay.length > 0) {
      this.selectedReservation = reservationsOnDay[0];
      this.showReservationDetails = true;
    }
  }

  closeReservationDetails() {
    this.showReservationDetails = false;
    this.selectedReservation = null;
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getCurrentMonthYear(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
