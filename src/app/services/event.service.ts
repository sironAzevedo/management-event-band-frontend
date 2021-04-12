import { API_CONFIG } from './../../config/api.config';
import { Event } from './../interfaces/Event';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    public http: HttpClient
  ) { }

  create(event: Event, bandId: number): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/events?band=${bandId}`, event);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/events?code=${id}`);
  }

  find(id: number): Observable<Event> {
    return this.http.get<Event>(`${API_CONFIG.baseUrl}/v1/events/detail?band=${id}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  findByBand(bandId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_CONFIG.baseUrl}/v1/events/by-band?band=${bandId}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
