import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location-service/location.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-locations',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
  ],
  templateUrl: './my-locations.component.html',
  styleUrl: './my-locations.component.css'
})
export class MyLocationsComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  locations : any;
  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

}
