import { API_CONFIG } from './../../config/api.config';
import { Voice } from './../interfaces/voice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  constructor(public http: HttpClient) {}

  list(email: string): Observable<Voice[]> {
    return this.http.get<Voice[]>(`${API_CONFIG.baseUrl}/v1/Voice`);
  }

  detail(code: number): Observable<Voice[]> {
    return this.http.get<Voice[]>(
      `${API_CONFIG.baseUrl}/v1/Voice/detail?code=${code}`
    );
  }
}
