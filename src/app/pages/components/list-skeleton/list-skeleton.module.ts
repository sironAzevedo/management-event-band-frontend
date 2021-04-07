import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSkeletonPageRoutingModule } from './list-skeleton-routing.module';

import { ListSkeletonPage } from './list-skeleton.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSkeletonPageRoutingModule
  ],
  declarations: [ListSkeletonPage]
})
export class ListSkeletonPageModule {}
