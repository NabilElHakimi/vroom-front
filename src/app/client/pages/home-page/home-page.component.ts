import {Component, OnInit} from '@angular/core';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';
import {VehicleService} from '../../../services/vehicle-service/vehicle.service';
import {NgForOf, NgIf} from '@angular/common';
import {Vehicle} from '../../../model/Vehicle';
import {SuccesstoastService} from '../../../services/toast-service/successtoast.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CarouselHomeComponent,
    VehicleCardComponent,
    NgForOf,

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  successToast : boolean = false;
  message:string = '';

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

      this.successToast = true;
      setTimeout(() => {
        this.successToast = false;
        this.message = '';
      }, 5000);
    });
  }





}
