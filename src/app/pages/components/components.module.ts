import { SearchMembersComponent } from '../band/search-members/search-members.component';
import { MaterialModule } from './material-design/material-design.module';
import { ListSkeletonPage } from './list-skeleton/list-skeleton.page';
import { HeaderPage } from './header/header.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderPage,
        ListSkeletonPage,
        SearchMembersComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        IonicModule.forRoot()
    ],
    exports: [
        FormsModule,
        HeaderPage,
        ListSkeletonPage,
        MaterialModule,
        SearchMembersComponent
    ],
    providers: [],
})
export class SheredComponentModule { }
