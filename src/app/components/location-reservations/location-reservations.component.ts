import { Component, OnInit } from '@angular/core';
import { LocationInfoComponent } from '../location-info/location-info.component';
import { LocationWithVehicles } from '../../model/LocationWithVehicles';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location-service/location.service';
import { ReservtionService } from '../../services/reservation-service/reservtion.service';
import { ReservationRes } from '../../model/ReservationRes';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';

@Component({
  selector: 'app-location-reservations',
  imports: [LocationInfoComponent, NgForOf, DatePipe, NgIf, NgClass],
  templateUrl: './location-reservations.component.html',
  styleUrl: './location-reservations.component.css',
})
export class LocationReservationsComponent implements OnInit {
  reservations: ReservationRes[] = [];
  locationId = 0;
  location: LocationWithVehicles | undefined;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private reservationsService: ReservtionService,
    private toast: SuccesstoastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.locationId = parseInt(id);
        this.getLocationById(this.locationId);
        this.getReservationsByLocationId(this.locationId);
      }
    });
  }

  getLocationById(id: number): void {
    this.locationService.getLocationById(id).subscribe((location) => {
      this.location = location;
    });
  }

  getReservationsByLocationId(locationId: number): void {
    this.reservationsService
      .getReservationsByLocationId(locationId, 1, 9)
      .subscribe((reservations) => {
        this.reservations = this.padReservations(reservations.content, 10);
      });
  }

  private padReservations(
    reservations: ReservationRes[],
    targetLength: number
  ): ReservationRes[] {
    const paddedReservations = [...reservations];
    while (paddedReservations.length < targetLength) {
      paddedReservations.push({} as ReservationRes);
    }
    return paddedReservations;
  }

  changeStatus(id: number | undefined, status: string): void {
    if (id) {
      this.reservationsService.changeStatus(id, status).subscribe(() => {
        this.getReservationsByLocationId(this.locationId);
        this.toast.showToast('Status changed successfully', 'success');
      });
    }
  }


  calculateTotalDays(startDate: string | undefined, endDate: string | undefined): number {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }

}
