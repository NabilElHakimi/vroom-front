import {Component, OnInit} from '@angular/core';
import {VehicleDetailsComponent} from '../../components/vehicle-details/vehicle-details.component';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';
import {NgForOf} from '@angular/common';
import {Vehicle} from '../../../model/Vehicle';
import {SuccesstoastService} from '../../../services/toast-service/successtoast.service';
import {VehicleService} from '../../../services/vehicle-service/vehicle.service';

@Component({
  selector: 'app-details-page',
  imports: [
    VehicleDetailsComponent,
    VehicleCardComponent,
    NgForOf
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {

  constructor(private vehicleService : VehicleService ,
              private successToastService : SuccesstoastService) {

  }

  vehicles: Vehicle[] = [] ;

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.vehicles = data.content;

      // this.successToast = true;
      setTimeout(() => {
        // this.successToast = false;
        // this.message = '';
      }, 5000);
    });
  }

}
