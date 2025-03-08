import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle-service/vehicle.service';
import { Vehicle } from '../../model/Vehicle';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';
import {PaginationComponentComponent} from '../../components/pagination-component/pagination-component.component';
import {NgForOf, NgIf} from '@angular/common';
import {LodaingComponentComponent} from '../../components/lodaing-component/lodaing-component.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    CarouselHomeComponent,
    VehicleCardComponent,
    PaginationComponentComponent,
    NgForOf,
    LodaingComponentComponent,
    NgIf
  ],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  vehicles: Vehicle[] = [];
  successToast: boolean = false;
  message: string = '';

  totalPages: number = 1;
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private successToastService: SuccesstoastService
  ) {}

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(page : number = 1): void {
    this.isLoading = true;
    this.vehicleService.getVehicle(page).subscribe((data: any) => {

      this.isLoading = false;
      this.vehicles = data.content;
      this.totalPages = data.totalPages;

      this.currentPage = page;

      this.successToast = true;
      setTimeout(() => {
        this.successToast = false;
        this.message = '';
      }, 5000);
    });
  }

  onPageChange(newPage: number) {
    this.getVehicle(newPage);
  }

}
