import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Vehicle } from '../../model/Vehicle';
import {FormsModule} from '@angular/forms';
import {AddVehicle} from '../../model/AddVehicle';
import {VehicleService} from '../../services/vehicle-service/vehicle.service';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {LodaingComponentComponent} from '../lodaing-component/lodaing-component.component';

@Component({
  selector: 'app-add-vehicle-modal',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    LodaingComponentComponent
  ],
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.css']
})
export class AddVehicleModalComponent implements OnInit{


  constructor(private vehicleService: VehicleService ,
              private toast : SuccesstoastService) {
  }

  @Input() locationId: number = 0 ;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    console.log(this.locationId)
  }

  fileCount: number = 0;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  maxImages = 5;
  minImages = 3;

  vehicle: AddVehicle = {}
  isLoading: boolean = false;

  closeModal() {
    this.close.emit();
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.fileCount = files.length;

    if (this.fileCount < this.minImages) {
      alert(`You must select at least ${this.minImages} image.`);
      return;
    }

    if (this.fileCount > this.maxImages) {
      alert(`You can only select up to ${this.maxImages} images.`);
      return;
    }

    this.selectedFiles = Array.from(files);

    this.imagePreviews = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }

  triggerFileInput() {
    document.getElementById('images')?.click();
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.fileCount = this.imagePreviews.length;
  }

  onSubmit() {
        this.isLoading = true;
        this.vehicle.locationId = this.locationId;

        this.vehicleService.addVehicle(this.vehicle, this.selectedFiles).subscribe(
          (response) => {
            this.toast.showToast('Vehicle added successfully' , 'success');
            this.closeModal();
            this.isLoading = false;
          }

        );
  }

}
