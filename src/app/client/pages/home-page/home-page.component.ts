import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {HeaderComponent} from '../../components/header/header.component';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';
import {VehicleService} from '../../../services/vehicle-service/vehicle.service';
import {NgForOf, NgIf} from '@angular/common';
import {Vehicle} from '../../../model/Vehicle';

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

  constructor(private vehicleService : VehicleService) {

  }

  vehicles: Vehicle[] = [] ;

  ngOnInit(): void {
        this.getVehicle();
    }

  getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.vehicles = data.content;
    });
  }




}
