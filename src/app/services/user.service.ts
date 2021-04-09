import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/users`, user);
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/users`, user);
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/v1/users/by-email?email=${email}`).pipe(
      retry(3),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/users?code=${id}`);
  }

  instrument(id: number, instruments: number): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/users/instrument?user_code=${id}&instruments=${instruments}`, null);
  }

  voice(id: number, voice: number): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/users/voice?user_code=${id}&voice=${voice}`, null);
  }

  searchLike(like: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/v1/users/by-like?like=${like}`);
  }
}
