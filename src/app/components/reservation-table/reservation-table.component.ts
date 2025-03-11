import {Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Reservation} from '../../model/Reservation';
import {ReservationRes} from '../../model/ReservationRes';
import {ReservtionService} from '../../services/reservation-service/reservtion.service';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reservation-table',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.css'
})
export class ReservationTableComponent {

  constructor(private reservationsService : ReservtionService  , private toast : SuccesstoastService) {}

  @Input() reservations: ReservationRes[] | undefined ;

  calculateTotalDaysBetween(startDate: string | undefined, endDate: string | undefined): number {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }

  changeStatus(id: number | undefined, status: string): void {
    if (id) {
      this.reservationsService.changeStatus(id, status).subscribe(() => {
        this.toast.showToast('Status changed successfully', 'success');
      });
    }
  }


}
