import { ComponentsModule } from './../components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AddUserPageComponent } from './user/add-user-page/add-user-page.component';
import { ListUserPageComponent } from './user/list-user-page/list-user-page.component';
import { ListeRestaurantPageComponent } from './restaurant/liste-restaurant-page/liste-restaurant-page.component';
import { AjoutRestoPageComponent } from './restaurant/ajout-resto-page/ajout-resto-page.component';
import { AjoutPlatPageComponent } from './plats/ajout-plat-page/ajout-plat-page.component';
import { ListePlatPageComponent } from './plats/liste-plat-page/liste-plat-page.component';
import { PanierPageComponent } from './panier-page/panier-page.component';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ListeCommandePageComponent } from './commande/liste-commande-page/liste-commande-page.component';
import { DetailsCommandePageComponent } from './commande/details-commande-page/details-commande-page.component';
import { AlivrerComponent } from './commande/alivrer/alivrer.component';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ComponentsModule,
    FormsModule,
    NgxLoadingModule,
    DndModule,
  ],
  declarations: [
    PagesComponent,
    AddUserPageComponent,
    ListUserPageComponent,
    ListeRestaurantPageComponent,
    AjoutRestoPageComponent,
    AjoutPlatPageComponent,
    ListePlatPageComponent,
    PanierPageComponent,
    ListeCommandePageComponent,
    DetailsCommandePageComponent,
    AlivrerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class PagesModule {
}
