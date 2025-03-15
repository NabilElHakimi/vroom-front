import { Component, OnInit } from '@angular/core';
import { LocationInfoComponent } from '../location-info/location-info.component';
import { LocationWithVehicles } from '../../model/LocationWithVehicles';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location-service/location.service';
import { ReservtionService } from '../../services/reservation-service/reservtion.service';
import { ReservationRes } from '../../model/ReservationRes';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { AdminCalendarComponent } from '../admin-calendar/admin-calendar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-reservations',
  imports: [
    LocationInfoComponent,
    NgForOf,
    DatePipe,
    NgIf,
    NgClass,
    AdminCalendarComponent,
    FormsModule
  ],
  standalone: true,
  templateUrl: './location-reservations.component.html',
  styleUrl: './location-reservations.component.css',
})
export class LocationReservationsComponent implements OnInit {
  reservations: ReservationRes[] = [];
  locationId = 0;
  location: LocationWithVehicles | undefined;
  showReservationModal: boolean = false;

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 9;
  itemsPerPageOptions: number[] = [5, 9, 15, 30];
  totalItems: number = 0;

  updateId: string = "";

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
        this.loadReservations();
      }
    });
  }

  getLocationById(id: number): void {
    this.locationService.getLocationById(id).subscribe((location) => {
      this.location = location;
    });
  }

  loadReservations(): void {
    this.reservationsService
      .getReservationsByLocationId(this.locationId, this.currentPage, this.itemsPerPage)
      .subscribe((response) => {
        this.reservations = this.padReservations(response.content, this.itemsPerPage);
        this.totalPages = response.totalPages;
        this.totalItems = response.totalElements;
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
        this.loadReservations();
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

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReservations();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReservations();
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.loadReservations();
  }


  resevationModal(id: number | undefined) {
    this.updateId = id?.toString() || "";
    this.showReservationModal = true;

  }

  protected readonly Number = Number;
}
