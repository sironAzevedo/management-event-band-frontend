import { Instrument } from './../../../interfaces/instrument';
import { User } from './../../../interfaces/user';
import { UserService } from './../../../services/user.service';
import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { BandMember } from './../../../interfaces/band-member';
import { BandService } from './../../../services/band.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import {IonSlides} from '@ionic/angular';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  titulo: string = 'Nome da Banda';
  bandId: number = 2;
  members: BandMember[] = [];

  users: User[] = [];  
  userSelected: string = null;
  instrumentSelected: any = null;
  voiceSelected: any = null;
  buttonDisable: boolean = true;
  slideSelected: number = 0;
  selectedValue: Object;
  queryText: string;

  @ViewChild(IonSlides) protected slides: IonSlides;
  @ViewChild('instrument') protected radioInstrument: MatRadioButton;

  

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

    this.bandService.listen().subscribe( (r:any) => {
      this.bandService.members(r).subscribe(res => {
        this.members = res;
      }),
        error => { }
    });
  }

  ngOnInit() {
    //this.load();
    this.getMembers(this.bandId);
    /* this.searchLike(); */
  }

  ionViewWillEnter() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(false)
    });
  }

  ionViewDidLeave() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(true)
      menu.swipeGesture = true;
    });
  }
  

  async load() {
    if (this.router.getCurrentNavigation().extras.state) {
      if (this.router.getCurrentNavigation().extras.state.band) {
        this.bandId = this.router.getCurrentNavigation().extras.state.band;
        this.titulo = this.router.getCurrentNavigation().extras.state.name;
        this.getMembers(this.router.getCurrentNavigation().extras.state.band);
      }
    } else {
      await this.routerNav.navigateBack('/bands');
    }
  }

  async getMembers(bandId: number) {
    this.bandService.members(bandId).subscribe(res => {
      console.log(res);
      this.members = res;
    }),
      error => { }
  }

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
      });
    }),
      error => { }
  }

  async deletMember(member: BandMember) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: 'Deseja realmente desassociar esse membro da banda?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.ionLoader.showLoader();
            this.bandService.disassociateMember(this.bandId, member.email)
            .pipe(finalize(() => this.ionLoader.hideLoader()))
            .subscribe(() => {
              let msg = 'Membro associado com sucesso';
              this.toasService.showToast(msg, 2000, 'success').then(() => {               
                /* this.bandService.filter(this.bandId); */
                this.getMembers(this.bandId);
              });
            }),
            error => { }
          }
        }
      ]
    });

    alert.present();
  }

  protected radioChange($event: MatRadioChange, user: User) {
    this.buttonDisable = false;
    this.userSelected = user.email;
    if(this.radioInstrument.checked) {
      this.instrumentSelected = $event.value;
    } else {
      this.voiceSelected = $event.value;
    }
}

  protected async slideChanged() {
    let currentIndex = await this.slides.getActiveIndex();
    if(this.slideSelected != currentIndex) {
      this.slideSelected = currentIndex;
      this.selectedValue = null; 
      this.instrumentSelected = null;
      this.voiceSelected = null;
      this.userSelected = null;
      this.buttonDisable = true;   
    }
  }
}
