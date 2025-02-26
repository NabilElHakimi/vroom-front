import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [NgClass, NgForOf],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  currentDate: Date = new Date(); // Currently displayed month
  daysInMonth: (number | null)[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Track selected period globally
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  // Today's date for disabling past days
  today: Date = new Date();

  constructor() {
    this.generateCalendar();
  }

  // Generate the calendar for the current month
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Calculate the starting day of the month (0 = Sunday, 6 = Saturday)
    const startDay = firstDay.getDay();

    // Fill the days array with null for days before the first day of the month
    this.daysInMonth = Array(startDay).fill(null);

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(i);
    }
  }

  // Navigate to the previous month
  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  // Navigate to the next month
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  // Get the current month and year
  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // Handle day selection for reservation
  selectDay(day: number | null): void {
    if (day && !this.isDayDisabled(day)) {
      const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

      if (this.selectedStartDate === null || this.selectedEndDate !== null) {
        // Start a new selection
        this.selectedStartDate = selectedDate;
        this.selectedEndDate = null;
      } else {
        // Complete the selection
        this.selectedEndDate = selectedDate;
        if (this.selectedStartDate > this.selectedEndDate) {
          // Swap if start is after end
          [this.selectedStartDate, this.selectedEndDate] = [this.selectedEndDate, this.selectedStartDate];
        }
        console.log(`Selected period: ${this.selectedStartDate.toDateString()} to ${this.selectedEndDate.toDateString()}`);
      }
    }
  }

  // Check if a day is within the selected period
  isDayInSelectedPeriod(day: number | null): boolean {
    if (day === null || this.selectedStartDate === null) return false;

    const currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

    if (this.selectedEndDate === null) {
      return currentDate.getTime() === this.selectedStartDate.getTime();
    } else {
      return currentDate >= this.selectedStartDate && currentDate <= this.selectedEndDate;
    }
  }

  // Check if a day is disabled (before today)
  isDayDisabled(day: number | null): boolean {
    if (day === null) return true;

    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const dayDate = new Date(currentYear, currentMonth, day);

    // Disable if the day is before today
    return dayDate < new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }



}
