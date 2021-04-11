import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  bandId: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
    ) {
    console.log('o id da banda é: ' + this.navParams.data.bandId);
   }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss(); 
  }

}
