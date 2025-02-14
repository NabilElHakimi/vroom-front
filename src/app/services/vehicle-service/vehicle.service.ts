import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http :  HttpClient) { }

  getVehicle(): Observable<any> {
    return this.http.get(`${environment.API_URL}/vehicles/all`);
  }

}
