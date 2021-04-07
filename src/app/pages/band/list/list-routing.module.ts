import { AuthGuardService } from './../../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  },
  {
    path: 'detail',
    loadChildren: () => import('../detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
