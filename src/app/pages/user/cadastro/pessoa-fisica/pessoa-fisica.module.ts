import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaFisicaPageRoutingModule } from './pessoa-fisica-routing.module';

import { PessoaFisicaPage } from './pessoa-fisica.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PessoaFisicaPageRoutingModule
  ],
  declarations: [PessoaFisicaPage]
})
export class PessoaFisicaPageModule {}
