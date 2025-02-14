import {Component, Input} from '@angular/core';
import {Vehicle} from '../../../model/Vehicle';

@Component({
  selector: 'app-vehicle-card',
  imports: [],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {

  @Input() vehicle!: Vehicle;

}
