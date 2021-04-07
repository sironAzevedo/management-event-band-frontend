import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },   
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoggedGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'bandas',
    loadChildren: () => import('./pages/band/list/list.module').then( m => m.ListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/band/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'pf',
    loadChildren: () => import('./pages/user/cadastro/pessoa-fisica/pessoa-fisica.module').then( m => m.PessoaFisicaPageModule)
  },
  {
    path: 'pj',
    loadChildren: () => import('./pages/user/cadastro/pessoa-juridica/pessoa-juridica.module').then( m => m.PessoaJuridicaPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/user/logout/logout.module').then( m => m.LogoutPageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
