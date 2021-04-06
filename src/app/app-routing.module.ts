import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },   
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/band/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/band/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'pessoa-fisica',
    loadChildren: () => import('./pages/user/cadastro/pessoa-fisica/pessoa-fisica.module').then( m => m.PessoaFisicaPageModule)
  },
  {
    path: 'pessoa-juridica',
    loadChildren: () => import('./pages/user/cadastro/pessoa-juridica/pessoa-juridica.module').then( m => m.PessoaJuridicaPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
