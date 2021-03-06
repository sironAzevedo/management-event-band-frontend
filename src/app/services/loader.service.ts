import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }

  // Show the loader for infinite time
  showLoader() {
    this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
    }).then((res) => {
      res.present();
    });

  }

  // Hide the loader if already created otherwise return error
  async hideLoader() {
    await this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
}
