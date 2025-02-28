import { Component, OnInit } from '@angular/core';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details.component';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { Vehicle } from '../../model/Vehicle';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { VehicleService } from '../../services/vehicle-service/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {PaginationComponentComponent} from '../../components/pagination-component/pagination-component.component';

@Component({
  selector: 'app-details-page',
  imports: [
    VehicleDetailsComponent,
    VehicleCardComponent,
    NgForOf,
    PaginationComponentComponent,
    NgIf
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleFound: Vehicle | null = null;

  loading = true;

  totalPages: number = 1;
  currentPage: number = 1;

  constructor(
    private vehicleService: VehicleService,
    private successToastService: SuccesstoastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getVehicle();

    this.loading = false;

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getVehicleById(id);
        window.scroll(0, 0);
      }
    });
  }

  getVehicleById(id: string): void {
    this.vehicleService.getVehicleById(id).subscribe((data: Vehicle) => {
      this.vehicleFound = data;
    });
  }

  getVehicle(page:number = 1): void {
    this.vehicleService.getVehicle(page).subscribe((data: any) => {
      this.vehicles = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = page;

    });
  }


  onPageChange(newPage: number) {
    this.getVehicle(newPage);
  }


}
