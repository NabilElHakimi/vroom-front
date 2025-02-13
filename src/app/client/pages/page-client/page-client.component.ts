import { Component } from '@angular/core';
import {CarouselHomeComponent} from "../../components/carousel-home/carousel-home.component";
import {HeaderComponent} from "../../components/header/header.component";
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-page-client',
  imports: [
    CarouselHomeComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './page-client.component.html',
  styleUrl: './page-client.component.css'
})
export class PageClientComponent {

}
