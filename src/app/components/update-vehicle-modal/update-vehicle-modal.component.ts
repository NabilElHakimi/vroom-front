import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Vehicle} from '../../model/Vehicle';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-vehicle-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-vehicle-modal.component.html',
  styleUrl: './update-vehicle-modal.component.css'
})
export class UpdateVehicleModalComponent {
  @Input() vehicle!: Vehicle;
  @Output() vehicleModal = new EventEmitter<Vehicle>();

  fileCount: number = 0;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  maxImages = 5;
  minImages = 3;

  closeModal() {
    this.vehicleModal.emit(this.vehicle);

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

  }
}
