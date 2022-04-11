import { RouterModule } from '@angular/router';
import { FormsModule } from './../pages/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule } from '@nebular/theme';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserComponent } from './user/form-user/form-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjoutRestoComponent } from './resto/ajout-resto/ajout-resto.component';
import { ListeRestoComponent } from './resto/liste-resto/liste-resto.component';
import { ListePlatComponent } from './plat/liste-plat/liste-plat.component';
import { FormPlatComponent } from './plat/form-plat/form-plat.component';
import { ListeCommandeComponent } from './commande/liste-commande/liste-commande.component';
import { DetailsCommandeComponent } from './commande/details-commande/details-commande.component';



@NgModule({
  declarations: [
    FormUserComponent,
    ListUserComponent,
    AjoutRestoComponent,
    ListeRestoComponent,
    ListePlatComponent,
    FormPlatComponent,
    ListeCommandeComponent,
    DetailsCommandeComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  exports: [
    FormUserComponent,
    ListUserComponent,
    AjoutRestoComponent,
    ListeRestoComponent,
    FormPlatComponent,
    ListePlatComponent,
    ListeCommandeComponent,
    DetailsCommandeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
