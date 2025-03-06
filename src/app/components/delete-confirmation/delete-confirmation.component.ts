import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {VehicleService} from '../../services/vehicle-service/vehicle.service';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-delete-confirmation',
    imports: [
        NgIf
    ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private vehicleService : VehicleService ,
              private toast : SuccesstoastService ,
              private route: ActivatedRoute, private router: Router) {
  }

  @Input() modalIsOpen = false;
  @Input() vehicleId: string = "";
  @Output() confirmDelete = new EventEmitter<void>();

  id: string | null = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  @Output() modalIsOpenChange = new EventEmitter<boolean>();

  closeAlert() {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

  deleteVehicle() {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);

    this.vehicleService.deleteVehicle(this.vehicleId).subscribe(() => {
      this.toast.showToast('Vehicle deleted successfully', 'success');
      this.confirmDelete.emit();

      window.location.reload()

    });
  }


}
