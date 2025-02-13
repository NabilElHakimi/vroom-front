import { Component } from '@angular/core';
import {VehicleDetailsComponent} from '../../components/vehicle-details/vehicle-details.component';
import {VehicleCardComponent} from '../../components/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-details-page',
  imports: [
    VehicleDetailsComponent,
    VehicleCardComponent
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {

}
