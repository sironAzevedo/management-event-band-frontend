import { ForgotComponent } from './../user/forgot/forgot.component';
import { LoaderService } from './../../services/loader.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Credential } from 'src/app/interfaces/credential';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;
  isValid: boolean;
  isInValid: boolean;
  addCan: boolean = false;

  constructor(
    public menu: MenuController,
    public router: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private ionLoader: LoaderService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.validFields();
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

  async login() {    
    
    this.addCan = true;
    await this.ionLoader.showLoader();    
    const user: Credential = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.senha
    }

    this.authService.authenticate(user)
      .pipe(finalize(() => this.ionLoader.hideLoader()))
      .subscribe(
        () => {
          this.router.navigateRoot('/home');
        },
        error => { 
          this.addCan = false;
          console.log(error)
        }
      );
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      senha: ['', Validators.required]
    });
  }

  get fg() {
    return this.formGroup.controls;
  }

  get isFieldValid() {
    const control = this.fg.email;

    if (control.touched || control.value != "") {
      if (control.status === 'VALID') {
        this.isInValid = false;
        return this.isValid = true;
      } else {
        this.isInValid = true;
        return this.isValid = false;
      }
    }
  }

  get isFieldInValid() {
    return this.isInValid;
  }

  async forgot() {
    const modal = await this.modalController.create({
      component: ForgotComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
}
