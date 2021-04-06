import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Credential } from 'src/app/interfaces/credential';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;
  private loading: any;
  isValid: boolean;
  isInValid: boolean;

  constructor(
    public router: NavController,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.validFields();
  }

  async login() {
 
    const user: Credential = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.senha
    }

    await this.presentLoading();
    console.log(user)
    
    this.authService.authenticate(user)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(
        () => {
          this.router.navigateRoot('/home');
        },
        error => { 
          //this.addCan = false;
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }


}
