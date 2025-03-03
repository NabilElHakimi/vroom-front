import {Component, OnInit} from '@angular/core';
import {LocationInfoComponent} from '../../components/location-info/location-info.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../services/location-service/location.service';
import {LocationWithVehicles} from '../../model/LocationWithVehicles';
import {NgForOf, NgIf} from '@angular/common';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-location-page',
  imports: [
    LocationInfoComponent,
    NgForOf,
    NgIf,
    VehicleCardComponent
  ],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})
export class LocationPageComponent  implements OnInit{


  constructor(private route: ActivatedRoute ,
              private locationService: LocationService) {}



  locationId  = 0 ;
  location : LocationWithVehicles | undefined;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
          if (id != null) {
        this.locationId = parseInt(id);
        this.getLocationById(this.locationId);
      }

    });


    }

    getLocationById(id: number): void {
      this.locationService.getLocationById(id).subscribe(location => {
        this.location = location ;
        console.log('Location:', this.location);
      });
    }

}
