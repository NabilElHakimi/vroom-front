import { Component, OnInit } from '@angular/core';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details.component';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { Vehicle } from '../../../model/Vehicle';
import { SuccesstoastService } from '../../../services/toast-service/successtoast.service';
import { VehicleService } from '../../../services/vehicle-service/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import {CalendarComponent} from '../../../components/calendar/calendar.component';

@Component({
  selector: 'app-details-page',
  imports: [
    VehicleDetailsComponent,
    VehicleCardComponent,
    NgForOf,
    CalendarComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleFound: Vehicle | null = null;

  constructor(
    private vehicleService: VehicleService,
    private successToastService: SuccesstoastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getVehicle();

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

  getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.vehicles = data.content;
    });
  }



}
