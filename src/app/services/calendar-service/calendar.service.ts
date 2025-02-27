import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient) { }



  addReservation(vehicleId: number, startDate: Date, endDate: Date): Observable<any> {
    return this.http.post(`${environment.API_URL}/reservations`, { vehicleId, startDate, endDate })
  }


}
