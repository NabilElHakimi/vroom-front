import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {LocationWithVehicles} from '../../model/LocationWithVehicles';
import {LocationWithOutVehicles} from '../../model/LocationWithOutVehicles';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  addLocation(location: LocationWithOutVehicles): Observable<Location> {
    return this.http.post<Location>(`${environment.API_URL}/location`, location);
  }

  getLocations(): Observable<any> {
    return this.http.get<Location[]>(`${environment.API_URL}/location/find-by-user`);
  }

  getLocationById(id: number): Observable<LocationWithVehicles> {
    return this.http.get<LocationWithVehicles>(`${environment.API_URL}/location/${id}`);
  }

}
