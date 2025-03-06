import {Component, OnInit} from '@angular/core';
import {LocationInfoComponent} from '../../components/location-info/location-info.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../services/location-service/location.service';
import {LocationWithVehicles} from '../../model/LocationWithVehicles';
import {NgForOf, NgIf} from '@angular/common';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';
import {AddButtonComponent} from '../../components/add-button/add-button.component';
import {AddVehicleModalComponent} from '../../components/add-vehicle-modal/add-vehicle-modal.component';
import {DeleteConfirmationComponent} from '../../components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-location-page',
  imports: [
    LocationInfoComponent,
    NgForOf,
    NgIf,
    VehicleCardComponent,
    AddButtonComponent,
    AddVehicleModalComponent,
    DeleteConfirmationComponent
  ],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})
export class LocationPageComponent  implements OnInit{


  constructor(private route: ActivatedRoute ,
              private locationService: LocationService) {}



  locationId  = 0 ;
  location : LocationWithVehicles | undefined;
  modalIsOpen :boolean = false;

  addVehicleModal = false;

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

    modalAddVehicle(): void {
      this.addVehicleModal = true;
    }

  closeModal(): void {
    this.addVehicleModal = false;
    this.getLocationById(this.locationId);
  }


}
