import { Instrument } from './../../../interfaces/instrument';
import { User } from './../../../interfaces/user';
import { UserService } from './../../../services/user.service';
import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { BandMember } from './../../../interfaces/band-member';
import { BandService } from './../../../services/band.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

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

    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(false)
    });


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
    this.searchLike();
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
              let msg = 'Membro desassociado com sucesso';
              this.toasService.showToast(msg, 2000, 'success').then(() => {               
                this.bandService.filter(this.bandId);
              });
            }),
            error => { }
          }
        }

      ]
    });

    alert.present();
  }

  addMember(user: User, instrument: Instrument) {
    console.log("user selected is: " + user.email);
    console.log("instrument selected is: " + instrument.codigo);
  }

  searchLike() {
    this.userService.searchLike('e').subscribe(res => {
      console.log(res);
      this.users = res;
    }),
      error => { }
  }

}
