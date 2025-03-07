import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Reservation} from '../../model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservtionService {

  constructor(private http :HttpClient) { }

  addReservation(vehicleId: number, startDate: Date, endDate: Date): Observable<any> {
    return this.http.post(`${environment.API_URL}/reservations`, { vehicleId, startDate, endDate })
  }

  getReservationsByLocationId(locationId: number , page: number | undefined , size : number|undefined ): Observable<any> {
    return this.http.get(`${environment.API_URL}/reservations/get-by-location/${locationId}?page=${page}&size=${size}`);

  }

  changeStatus(id: number | undefined , status : string) : Observable<any> {
    return this.http.put(`${environment.API_URL}/reservations/update-status/${id}?status=${status}`, {});
  }
}
