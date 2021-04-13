import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forgot } from 'src/app/interfaces/forgot';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  addCan: boolean = false;
  formGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private ionLoader: LoaderService,
    private modalController: ModalController,
    private toasService: ToastService,
  ) { }

  ngOnInit() {
    this.validFields();
  }

  dismissModal() {
    this.modalController.dismiss(); 
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
  }

  async enviar() {
    this.addCan = true;
    await this.ionLoader.showLoader();

    const forgot: Forgot = {
      email: this.formGroup.value.email
    }

    this.userService.forgot(forgot)
    .pipe(finalize(() => this.ionLoader.hideLoader()))
    .subscribe(
      () => {
        let msg = 'Email enviado com sucesso';
        this.toasService.showToast(msg, 2000, 'success').then(() => {               
          this.dismissModal();
        });
      },
      error => { 
        this.addCan = false;
      }
    );
  }

}
