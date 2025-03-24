import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vehicle} from '../../model/Vehicle';
import {JsonPipe, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {DeleteConfirmationComponent} from '../delete-confirmation/delete-confirmation.component';
import {UpdateVehicleModalComponent} from '../update-vehicle-modal/update-vehicle-modal.component';
import {AdminCalendarComponent} from '../admin-calendar/admin-calendar.component';

@Component({
  selector: 'app-vehicle-card',
  imports: [
    NgIf,
    RouterLink,
    DeleteConfirmationComponent,
    UpdateVehicleModalComponent,
    AdminCalendarComponent,
    SlicePipe,
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {

  updateModalIsOpen: boolean = false;
  modalIsOpen :boolean = false;
  @Output() vehicleDeleted = new EventEmitter<string>();
  @Input() vehicle!: Vehicle;

  calendarIsOpen: boolean = false;

  closeCalendar() {
    this.calendarIsOpen = false;
  }

  openCalendar() {
    this.calendarIsOpen = true;
  }


  isNewVehicle(): boolean {
    if (!this.vehicle || !this.vehicle.createdAt) {
      return false;
    }

    const createdAtDate = new Date(this.vehicle.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return createdAtDate >= sevenDaysAgo;

  }

  isLeader(): boolean {
    return this.vehicle.userDetails.username == localStorage.getItem('username');
  }

  openDeleteModal(): void {
    this.modalIsOpen = true;
  }

  onDelete(vehicleId: string) {
    console.log('Vehicle Card : ' + vehicleId);
    this.vehicleDeleted.emit(vehicleId);
  }


  openUpdateModal() {
    this.updateModalIsOpen = true;
  }
  protected readonly Number = Number;
}
