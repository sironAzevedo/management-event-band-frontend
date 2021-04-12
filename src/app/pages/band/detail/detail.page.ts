import { EventService } from './../../../services/event.service';
import { EventPage } from './../event/event.page';
import { User } from './../../../interfaces/user';
import { UserService } from './../../../services/user.service';
import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { BandMember } from './../../../interfaces/band-member';
import { BandService } from './../../../services/band.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/interfaces/Event';



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
  events: Event[] = [];

  repertorios: Array<{name: string, autor: string}>;

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
    public userService: UserService,
    public modalController: ModalController,
    private eventService: EventService
  ) {
    this.bandService.listen().subscribe( (band: any) => {
      /* this.bandService.members(band).subscribe(res => {
        this.members = res;
      }),
        error => { } */
        this.getMembers(band);
    });
  }

  ngOnInit() {
    //this.load();
    this.getMembers(this.bandId);
    this.loadEvents();
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
        /* this.loadEvents(); */
      }
    } else {
      await this.routerNav.navigateBack('/bands');
    }
  }

  async getMembers(bandId: number) {
    this.bandService.members(bandId).subscribe(res => {
      this.members = res;

      this.listRepertorio().subscribe(res => {
        this.repertorios = res;
      });
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

  async openEvent() {

    const modal = await this.modalController.create({
      component: EventPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'bandId': this.bandId
      }
    });
    return await modal.present();
  }

  listRepertorio(): Observable<any[]> {
    const items = [
      {
        name: 'Musica - 01', autor: 'Autor - 01'
      },
      {
        name: 'Musica - 02', autor: 'Autor - 02'
      },
      {
        name: 'Musica - 03', autor: 'Autor - 03'
      }
    ]
    return of(items);    
  }

  loadEvents() {
    this.eventService.findByBand(this.bandId).subscribe(
      response => {
        this.events = response;
      },
      error => { }
    );
  }


}
