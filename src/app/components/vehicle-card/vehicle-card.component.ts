import {Component, Input} from '@angular/core';
import {Vehicle} from '../../model/Vehicle';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {

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


}
