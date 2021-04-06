import { API_CONFIG } from './../../config/api.config';
import { Instrument } from './../interfaces/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(
    public http: HttpClient
  ) { }

  list(email: string): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(`${API_CONFIG.baseUrl}/v1/instruments`);
  }

  detail(code: number): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(`${API_CONFIG.baseUrl}/v1/instruments/detail?code=${code}`);
  }
}
