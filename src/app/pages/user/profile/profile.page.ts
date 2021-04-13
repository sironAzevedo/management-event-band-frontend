import { StorageService } from './../../../services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string = '';
  formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    public fb: FormBuilder,
  ) {
    this.email = this.storageService.getLocalUser().email;
   }

  ngOnInit() {

    this.validFields();
    this.profile();

  }

  validFields() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      phone: ['', Validators.required]
    });
  }

  profile() {
    this.userService.findByEmail(this.email).subscribe(res => {
      this.formGroup.controls['name'].setValue(res.name);
        this.formGroup.controls['email'].setValue(res.email);
        this.formGroup.controls['phone'].setValue(res.phone);
    });
  }

  update() {
    console.log('update user');
  }

}
