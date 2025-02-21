import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../model/Vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent  {
  @Input() vehicle!: Vehicle;
  @Input() firstImage!: string | undefined;

  isModalOpen = false;
  currentImageIndex = 0;

  constructor(private router: Router, private renderer: Renderer2, private activatedRoute: ActivatedRoute) {}

  get allImages(): string[] {
    return this.vehicle.articleImages?.map(img => img.imageUrl) || [];
  }

  changeImage(imageUrl: string) {
    const index = this.allImages.indexOf(imageUrl);
    if (index !== -1) {
      this.currentImageIndex = index;
    }
  }

  toggleModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = this.isModalOpen ? 'hidden' : 'auto';
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0
      ? this.allImages.length - 1
      : this.currentImageIndex - 1;
  }

}
