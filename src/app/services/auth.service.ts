import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, retry } from 'rxjs/operators';
import { LocalUser } from '../interfaces/local-user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public router: NavController
  ) { }

  authenticate(user: Credential): Observable<AuthResponse> {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.token) {
          this.successfulLogin(res.token);
        }
      })
    );
  }

  successfulLogin(authorizationValue: string) {
    const token = authorizationValue.substring(7);
    const user: LocalUser = {
      token: token,
      email: this.jwtHelper.decodeToken(token).sub
    };
    this.storage.setLocalUser(user);
    this.authenticationState.next(true);
  }

  isAuthenticated(): Observable<boolean> {
    const jwt = this.storage.getLocalUser();
    if (jwt && !this.jwtHelper.isTokenExpired(jwt.token)) {
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    }
    return of(this.authenticationState.value);
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigateRoot('/login');
  }
}
