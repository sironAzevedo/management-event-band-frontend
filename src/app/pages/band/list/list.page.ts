import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { MenuController, AlertController } from '@ionic/angular';
import { UserService } from './../../../services/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';
import { BandService } from './../../../services/band.service';
import { Component, OnInit } from '@angular/core';
import { Band } from 'src/app/interfaces/band';
import { finalize } from 'rxjs/operators';

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
    public menu: MenuController,
    private alertCtrl: AlertController,
    private ionLoader: LoaderService,
    private toasService: ToastService,
  ) { 
    this.email = this.storageService.getLocalUser().email;
  }

  ngOnInit() {
    this.bucketUrl = "/assets/imgs/band.jpg";
  }

  ionViewWillEnter() {
    this.loadBands(); 
  }

  ionViewDidLeave() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(true)
      menu.swipeGesture = true;
    });
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

  async delete(band: Band) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: 'Deseja realmente excluir essa banda?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.ionLoader.showLoader();
            this.bandService.delete(band.codigo)
            .pipe(finalize(() => this.ionLoader.hideLoader()))
            .subscribe(() => {
              let msg = 'Banda excluida com sucesso';
              this.toasService.showToast(msg, 2000, 'success').then(() => {               
                /* this.bandService.filter(this.bandId); */
                this.loadBands();
              });
            }),
            error => { }
          }
        }
      ]
    });

    alert.present();
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
