import { SheredComponentModule } from 'src/app/pages/components/components.module';
import { HeaderPage } from './../../components/header/header.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SheredComponentModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
