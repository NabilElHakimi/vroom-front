import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-carousel-home',
  imports: [CommonModule],
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.css'
})
export class CarouselHomeComponent {


  slides = [
    {
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      title: 'Mercedes AMG GT',
      description: 'Performance et élégance réunies'
    },
    {
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      title: 'Porsche 911',
      description: "L'icône du sport automobile"
    },
    {
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      title: 'Audi R8',
      description: "La puissance à l'état pur"
    }
  ];

  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previous() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.next(), 5000);
  }

}
