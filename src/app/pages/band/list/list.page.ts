import { UserService } from './../../../services/user.service';
import { NavigationExtras, Router } from '@angular/router';
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
  bucketUrl: string;

  constructor(
    private bandService: BandService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
  ) { 
    this.email = this.storageService.getLocalUser().email;
  }

  ngOnInit() {
    this.bucketUrl = "/assets/imgs/band.jpg";
  }

  ionViewWillEnter() {
    this.loadBands();
  }

  async loadBands() {
    await this.bandService.listBandByUser(this.email).subscribe(
      response => {
        this.bands = response;
      },
      error => { }
    );
  }

  addBand() {
    
  }

  delete(band: Band) {

  }

  async detail(band: Band) {
    const params: NavigationExtras = {
      state: {
        band: band.codigo,
        name: band.name
      }
    };
    await this.router.navigate(['/bands/detail'], params);
  }

  searchLike(band: any) {
    let val = band.target.value;
    if(val && val.trim() != '') {
      this.bandService.searchLike(this.email, val).subscribe(res => {
        this.bands = res;
      }),
        error => { }
    } else {
      this.loadBands();
    }
  }
}
