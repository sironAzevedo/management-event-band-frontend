import { SheredComponentModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaJuridicaPageRoutingModule } from './pessoa-juridica-routing.module';

import { PessoaJuridicaPage } from './pessoa-juridica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PessoaJuridicaPageRoutingModule,
    SheredComponentModule
  ],
  declarations: [PessoaJuridicaPage]
})
export class PessoaJuridicaPageModule {}
