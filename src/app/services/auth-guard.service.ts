import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: NavController
) { }

canActivate(): Promise<boolean> {
    return new Promise(resolve => {
        this.auth.isAuthenticated().subscribe(state => {
            if (!state) {
                this.auth.logout();
            }
            resolve(state ? true : false);
        })
    });
}
}
