import {Component, Input} from '@angular/core';
import {LocationWithVehicles} from "../../model/LocationWithVehicles";

@Component({
  selector: 'app-location-info',
  imports: [],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.css'
})
export class LocationInfoComponent {

  @Input() location: LocationWithVehicles | undefined;

}
