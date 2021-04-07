import { API_CONFIG } from './../../config/api.config';
import { Instrument } from './../interfaces/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(
    public http: HttpClient
  ) { }

  list(email: string): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(`${API_CONFIG.baseUrl}/v1/instruments`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  detail(code: number): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(`${API_CONFIG.baseUrl}/v1/instruments/detail?code=${code}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
