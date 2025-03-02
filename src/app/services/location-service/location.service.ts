import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {LocationWithVehicles} from '../../model/LocationWithVehicles';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  addLocation(location: LocationWithVehicles): Observable<Location> {
    return this.http.post<Location>(`${environment.API_URL}/location`, location);
  }

}
