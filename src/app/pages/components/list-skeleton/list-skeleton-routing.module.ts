import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSkeletonPage } from './list-skeleton.page';

const routes: Routes = [
  {
    path: '',
    component: ListSkeletonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSkeletonPageRoutingModule {}
