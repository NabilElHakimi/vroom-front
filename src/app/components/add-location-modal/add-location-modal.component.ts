import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LocationWithOutVehicles} from '../../model/LocationWithOutVehicles';
import {LocationService} from '../../services/location-service/location.service';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';

@Component({
  selector: 'app-add-location-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.css'
})
export class AddLocationModalComponent {


  constructor(private locationService: LocationService ,
              private toast: SuccesstoastService) {
  }

  @Input() location : LocationWithOutVehicles = {} ;
  @Output() closeModal = new EventEmitter<void>();
  @Output() isSaved = new EventEmitter<void>();


  onCloseModal() {
     this.closeModal.emit();
  }



  onSubmit() {
    this.locationService.addLocation(this.location).subscribe(
      {
        next: () => {
          this.toast.showToast('Location added successfully', 'success');
          this.onCloseModal();
          this.isSaved.emit();
        }
      }
    )
  }
}

