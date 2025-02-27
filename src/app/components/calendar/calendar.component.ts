import {Component, Input} from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [NgClass, NgForOf],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {

  @Input() vehicleID : number = 0;

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

  constructor() {
    this.generateCalendar();
  }

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



}
