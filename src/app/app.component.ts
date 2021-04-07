import { API_CONFIG } from './../config/api.config';
import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  profileImage;

  public appPages = [
    {
      title: 'Bandas',
      url: '/bandas',
      icon: 'radio-outline'
    },
    {
      title: 'Profile',
      url: '/cadastro',
      icon: 'person-outline'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'power'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.profileImage = '../assets/imgs/marty-avatar.png';

    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url) {
        this.selectedPath = event.url;
      }
    })


  }
}
