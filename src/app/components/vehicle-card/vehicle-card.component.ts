import {Component, Input} from '@angular/core';
import {Vehicle} from '../../model/Vehicle';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {DeleteConfirmationComponent} from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-vehicle-card',
  imports: [
    NgIf,
    RouterLink,
    DeleteConfirmationComponent
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {


  modalIsOpen :boolean = false;

  @Input() vehicle!: Vehicle;

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

}
