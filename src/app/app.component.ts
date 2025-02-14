import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './client/components/header/header.component';
import {CarouselHomeComponent} from './client/components/carousel-home/carousel-home.component';
import {FooterComponent} from './client/components/footer/footer.component';
import {ThemeService} from './services/theme-service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vroom-front';
  constructor(private themeService: ThemeService) {}

}
