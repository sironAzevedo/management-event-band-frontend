import { User } from '../../../interfaces/user';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { AlertController, IonSlides, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BandService } from 'src/app/services/band.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'search-members',
  templateUrl: './search-members.component.html',
  styleUrls: ['./search-members.component.scss'],
})
export class SearchMembersComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() bandId: number;

  userSelected: string = null;
  instrumentSelected: any = null;
  voiceSelected: any = null;
  buttonDisable: boolean = true;
  slideSelected: number = 0;
  selectedValue: number;
  queryText: string;

  @ViewChild(IonSlides) protected slides: IonSlides;
  @ViewChild('instrument') protected radioInstrument: MatRadioButton;
  @ViewChild('voice') protected radioVoice: MatRadioButton;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.2
  }

  constructor(
    public router: Router,
    public routerNav: NavController,
    private bandService: BandService,
    private ionLoader: LoaderService,
    private alertCtrl: AlertController,
    private toasService: ToastService,
    public menu: MenuController,
    public userService: UserService
  ) { 
    this.queryText = '';
  }

  ngOnInit() {}

  searchLike(user: any) {
    let val = user.target.value;
    if(val && val.trim() != '') {
      this.userService.searchLike(val).subscribe(res => {
        console.log(res);
        this.users = res;
      }),
        error => { }
    } else {
      this.users = [];
    }
  }

  async addMember() {
    const alert = await this.alertCtrl.create({       
      message: 'Deseja adiconar este membro como lider da banda?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.associateMember(false);
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.associateMember(true);
          }
        }
      ]
    });

    alert.present();
  }

  associateMember(leader: boolean) {
    this.ionLoader.showLoader();
    this.bandService.associateMember(this.bandId, this.userSelected, leader, this.instrumentSelected, this.voiceSelected)
    .pipe(finalize(() => this.ionLoader.hideLoader()))
    .subscribe(() => {
      let msg = 'Membro desassociado com sucesso';
      this.toasService.showToast(msg, 2000, 'success').then(() => {               
        this.bandService.filter(this.bandId);
        this.cleanField();
      });
    }),
      error => { }
  }

  protected radioChange($event: MatRadioChange, user: User) {
    this.buttonDisable = false;
    this.userSelected = user.email;
    if(this.radioInstrument && this.radioInstrument.checked) {
      this.instrumentSelected = $event.value;
    } else {
      this.voiceSelected = $event.value;
    }
  }

  protected async slideChanged() {
    let currentIndex = await this.slides.getActiveIndex();
    if(this.slideSelected != currentIndex) {
      this.slideSelected = currentIndex;
      this.cleanField();
    }
  }

  protected cleanField() {
      this.selectedValue = null;
      this.instrumentSelected = null;
      this.voiceSelected = null;
      this.userSelected = null;
      this.buttonDisable = true;
  }
}
