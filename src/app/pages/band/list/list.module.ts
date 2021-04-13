import { ListSkeletonPage } from './../../components/list-skeleton/list-skeleton.page';
import { HeaderPage } from './../../components/header/header.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { SheredComponentModule } from '../../components/components.module';
import { CreateBandComponent } from '../create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    SheredComponentModule
  ],
  declarations: [ListPage, CreateBandComponent]
})
export class ListPageModule {}
