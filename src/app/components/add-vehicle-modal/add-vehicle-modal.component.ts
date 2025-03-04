import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-vehicle-modal',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.css']
})
export class AddVehicleModalComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.locationId)
  }

  @Input() locationId: number = 0 ;
  @Output() close = new EventEmitter<void>();

  fileCount: number = 0;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  maxImages = 5;
  minImages = 3;

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
    this.fileCount = this.imagePreviews.length;  // Update file count
  }
}
