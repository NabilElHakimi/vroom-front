import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location-service/location.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AddVehicleModalComponent} from '../add-vehicle-modal/add-vehicle-modal.component';
import {AddLocationModalComponent} from '../add-location-modal/add-location-modal.component';

@Component({
  selector: 'app-my-locations',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    AddLocationModalComponent,
  ],
  templateUrl: './my-locations.component.html',
  styleUrl: './my-locations.component.css'
})
export class MyLocationsComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  addModalIsOpen = false;
  locations : any;
  ngOnInit(): void {
    this.getLocations();
  }

  showAddModal() {
      this.addModalIsOpen = true;
  }

  getLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

}
