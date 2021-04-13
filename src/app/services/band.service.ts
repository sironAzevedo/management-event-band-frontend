import { retry, catchError } from 'rxjs/operators';
import { BandMember } from './../interfaces/band-member';
import { API_CONFIG } from './../../config/api.config';
import { Band } from './../interfaces/band';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(
    public http: HttpClient
  ) { }

  create(band: Band): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/bands`, band);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/bands?code=${id}`);
  }

  listBandByUser(email: string): Observable<Band[]> {
    return this.http.get<Band[]>(`${API_CONFIG.baseUrl}/v1/bands/by-user?email_member=${email}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  associateMember(band_code: number, email_member: string, leader: boolean, instrument_code?: number, voice_code?: number): Observable<any> {
    
    let params: string = `band_code=${band_code}&email_member=${email_member}&leader=${leader}`;
    if(instrument_code) {
      params = params.concat(`&instrument_code=${instrument_code}`);
    }

    if(voice_code) {
      params = params.concat(`&voice_code=${voice_code}`);
    }
    
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/bands/associate-member?${params}`, null);
  }

  disassociateMember(band_code: number, email_member: string): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/bands/disassociate-member?band_code=${band_code}&email_member=${email_member}`);
  }

  find(band_code: number): Observable<Band> {
    return this.http.get<Band>(`${API_CONFIG.baseUrl}/v1/bands/detail?code=${band_code}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  members(band_code: number): Observable<BandMember[]> {
    return this.http.get<BandMember[]>(`${API_CONFIG.baseUrl}/v1/bands/members?band_code=${band_code}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  searchLike(email: string, name: string): Observable<Band[]> {
    return this.http.get<Band[]>(`${API_CONFIG.baseUrl}/v1/bands/by-like?email=${email}&name=${name}`);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(value: number) {
    this._listners.next(value);
  }

  filterBool(value: boolean) {
    this._listners.next(value);
  }
}
