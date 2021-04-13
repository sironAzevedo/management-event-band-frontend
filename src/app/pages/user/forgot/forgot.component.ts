import { LoaderService } from './../../../services/loader.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  enviar() {
    let email = this.formGroup.value.email;
    console.log(email);
  }

}
