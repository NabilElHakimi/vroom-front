import { Component } from '@angular/core';
import {LocationService} from '../../services/location-service/location.service';
import {LocationWithVehicles} from '../../model/LocationWithVehicles';
import {FormsModule} from '@angular/forms';
import {SuccessToastComponent} from '../success-toast/success-toast.component';
import {SuccesstoastService} from '../../services/toast-service/successtoast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-location-form',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './first-location-form.component.html',
  styleUrl: './first-location-form.component.css'
})
export class FirstLocationFormComponent {
  constructor(private locationService : LocationService ,
              private toast : SuccesstoastService,
              private router:Router) {}

  location: LocationWithVehicles = {
    name: '',
    address: '',
    city: '',
    telephone: '',
    email: ''
  }

  onSubmit() {
    this.locationService.addLocation(this.location).subscribe(
      () => {
        this.toast.showToast('Location added successfully', 'success');
        localStorage.setItem('role' , 'LEADER');
        this.router.navigate(['/client/my-locations']);
      },
    );
  };

}
