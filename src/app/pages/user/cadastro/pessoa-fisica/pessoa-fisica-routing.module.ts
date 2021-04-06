import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaFisicaPage } from './pessoa-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: PessoaFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaFisicaPageRoutingModule {}
