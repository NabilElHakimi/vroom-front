import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location-service/location.service';

@Component({
  selector: 'app-my-locations',
  imports: [],
  templateUrl: './my-locations.component.html',
  styleUrl: './my-locations.component.css'
})
export class MyLocationsComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {

    });
  }

}
