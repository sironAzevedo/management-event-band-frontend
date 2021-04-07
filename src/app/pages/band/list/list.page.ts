import { StorageService } from './../../../services/storage.service';
import { BandService } from './../../../services/band.service';
import { Component, OnInit } from '@angular/core';
import { Band } from 'src/app/interfaces/band';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  bands: Band[] = [];
  email: string = '';

  constructor(
    private bandService: BandService,
    private storageService: StorageService,
  ) { 
    this.email = this.storageService.getLocalUser().email;
  }

  ngOnInit() {
    this.loadBands();
    console.log(this.bands);
  }

  loadBands() {
    this.bandService.listBandByUser(this.email).subscribe(
      response => {
        console.log(response);
        //this.bands = response;
      },
      error => { }
    );
  }

}
