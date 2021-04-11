import { MenuController, NavController } from '@ionic/angular';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.page.html',
  styleUrls: ['./pessoa-fisica.page.scss'],
})
export class PessoaFisicaPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    public menu: MenuController,
    public router: NavController,
    public formBuilder: FormBuilder,
    public userService: UserService,
    private ionLoader: LoaderService
  ) { }

  ngOnInit() {
    this.validFields();
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

}
