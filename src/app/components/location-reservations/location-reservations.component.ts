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
  // Original reservations data
  reservations: ReservationRes[] = [];
  filteredReservations: ReservationRes[] = [];
  displayedReservations: ReservationRes[] = [];

  // Location info
  locationId = 0;
  location: LocationWithVehicles | undefined;
  showReservationModal: boolean = false;
  updateId: string = "";

  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 9;
  itemsPerPageOptions: number[] = [5, 9, 15, 30, 50];
  totalItems: number = 0;

  // Search and filter properties
  searchQuery: string = '';
  statusFilter: string = 'ALL';
  startDateFilter: string = '';
  endDateFilter: string = '';

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
    // When using server-side filtering, we would pass filter params to the API
    // For now, we'll fetch all and filter client-side for demo purposes
    this.reservationsService
      .getReservationsByLocationId(this.locationId, this.currentPage, this.itemsPerPage)
      .subscribe((response) => {
        this.reservations = response.content;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;

        // Apply any active filters
        this.applyFilters();
      });
  }

  // Search and Filtering
  onSearch(): void {
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onDateFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.reservations];

    // Apply search query filter
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(res =>
        // Search by ID
        (res.id?.toString().includes(query)) ||
        // Search by user name
        (res.user?.first_name?.toLowerCase().includes(query)) ||
        (res.user?.last_name?.toLowerCase().includes(query)) ||
        // Search by vehicle details
        (res.vehicle?.mark?.toLowerCase().includes(query)) ||
        (res.vehicle?.model?.toLowerCase().includes(query)) ||
        (res.vehicle?.codeCar?.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (this.statusFilter && this.statusFilter !== 'ALL') {
      filtered = filtered.filter(res => res.status === this.statusFilter);
    }

    // Apply date range filter
    if (this.startDateFilter) {
      const startDate = new Date(this.startDateFilter);
      filtered = filtered.filter(res => {
        if (!res.startDate) return false;
        return new Date(res.startDate) >= startDate;
      });
    }

    if (this.endDateFilter) {
      const endDate = new Date(this.endDateFilter);
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      filtered = filtered.filter(res => {
        if (!res.endDate) return false;
        return new Date(res.endDate) <= endDate;
      });
    }

    // Update filtered reservations
    this.filteredReservations = filtered;

    // Update pagination based on filtered results
    this.updatePagination();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = 'ALL';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  updatePagination(): void {
    // Calculate total pages based on filtered items
    this.totalPages = Math.max(1, Math.ceil(this.filteredReservations.length / this.itemsPerPage));

    // Make sure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    // Update displayed reservations based on current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredReservations.length);
    this.displayedReservations = this.filteredReservations.slice(startIndex, endIndex);
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
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  resevationModal(id: number | undefined) {
    this.updateId = id?.toString() || "";
    this.showReservationModal = true;
  }

  protected readonly Number = Number;
}
