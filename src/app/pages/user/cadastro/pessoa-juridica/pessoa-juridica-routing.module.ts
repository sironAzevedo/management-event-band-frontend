import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaJuridicaPage } from './pessoa-juridica.page';

const routes: Routes = [
  {
    path: '',
    component: PessoaJuridicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaJuridicaPageRoutingModule {}
