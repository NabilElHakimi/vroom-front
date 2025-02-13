import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './client/components/header/header.component';
import {CarouselHomeComponent} from './client/components/carousel-home/carousel-home.component';
import {FooterComponent} from './client/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CarouselHomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vroom-front';
}
