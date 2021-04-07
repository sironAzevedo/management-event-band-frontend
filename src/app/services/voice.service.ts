import { API_CONFIG } from './../../config/api.config';
import { Voice } from './../interfaces/voice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  constructor(public http: HttpClient) {}

  list(email: string): Observable<Voice[]> {
    return this.http.get<Voice[]>(`${API_CONFIG.baseUrl}/v1/Voice`).pipe(
      retry(3),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  detail(code: number): Observable<Voice[]> {
    return this.http
      .get<Voice[]>(`${API_CONFIG.baseUrl}/v1/Voice/detail?code=${code}`)
      .pipe(
        retry(3),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
