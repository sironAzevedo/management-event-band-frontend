import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: NavController) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.isAuthenticated().subscribe((state) => {
        if (state) {
          this.router.navigateRoot('/home');
        }
        resolve(!state ? true : false);
      });
    });
  }
}
