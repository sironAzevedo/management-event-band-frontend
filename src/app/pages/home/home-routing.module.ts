import { AuthGuardService } from './../../services/auth-guard.service';
import { ProfilePageModule } from './../user/profile/profile.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)
      },
       {
        path: 'bands',
        loadChildren: () => import('../band/list/list.module').then(m => m.ListPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('../user/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuardService]
      }      
    ]
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
