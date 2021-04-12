import { EventService } from './../../../services/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/interfaces/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  bandId: any;
  events: Event[] = [];

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private eventService: EventService
    ) {
    this.bandId = +this.navParams.data.bandId;
   }

  ngOnInit() {  
    this.loadEvents();
  }

  dismissModal() {
    this.modalController.dismiss(); 
  }

  async loadEvents() {
    await this.eventService.findByBand(this.bandId).subscribe(
      response => {
        this.events = response;
      },
      error => { }
    );
  }

}
