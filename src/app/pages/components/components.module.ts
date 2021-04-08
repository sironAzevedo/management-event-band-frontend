import { MaterialModule } from './material-design/material-design.module';
import { ListSkeletonPage } from './list-skeleton/list-skeleton.page';
import { HeaderPage } from './header/header.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        HeaderPage,
        ListSkeletonPage
    ],
    imports: [
        CommonModule,
        MaterialModule,
        IonicModule.forRoot()
    ],
    exports: [
        HeaderPage,
        ListSkeletonPage,
        MaterialModule
    ],
    providers: [],
})
export class SheredComponentModule { }
