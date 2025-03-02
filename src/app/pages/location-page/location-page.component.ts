import { Component } from '@angular/core';
import {LocationInfoComponent} from '../../components/location-info/location-info.component';

@Component({
  selector: 'app-location-page',
  imports: [
    LocationInfoComponent
  ],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})
export class LocationPageComponent {

}
