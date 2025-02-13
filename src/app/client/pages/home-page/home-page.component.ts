import { Component } from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [
    FooterComponent,
    CarouselHomeComponent,
    HeaderComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
