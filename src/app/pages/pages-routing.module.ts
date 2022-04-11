import { AlivrerComponent } from './commande/alivrer/alivrer.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { DetailsCommandePageComponent } from './commande/details-commande-page/details-commande-page.component';
import { ListePlatPageComponent } from './plats/liste-plat-page/liste-plat-page.component';
import { AjoutPlatPageComponent } from './plats/ajout-plat-page/ajout-plat-page.component';
import { ListUserPageComponent } from './user/list-user-page/list-user-page.component';
import { AddUserPageComponent } from './user/add-user-page/add-user-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ListeRestaurantPageComponent } from './restaurant/liste-restaurant-page/liste-restaurant-page.component';
import { AjoutRestoPageComponent } from './restaurant/ajout-resto-page/ajout-resto-page.component';
import { PanierPageComponent } from './panier-page/panier-page.component';
import { ListeCommandePageComponent } from './commande/liste-commande-page/liste-commande-page.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'utilisateurs/ajout',
      component: AddUserPageComponent 
    },
    {
      path: 'utilisateurs',
      component: ListUserPageComponent 
    },
    {
      path: 'restaurants/ajout',
      component: AjoutRestoPageComponent
    },
    {
      path: 'restaurants',
      component: ListeRestaurantPageComponent 
    },
    {
      path: 'plats/ajout',
      component: AjoutPlatPageComponent
    },
    {
      path: 'plats',
      component: ListePlatPageComponent 
    },
    {
      path: 'panier',
      component: PanierPageComponent 
    },
    {
      path: 'commandes',
      component: ListeCommandePageComponent 
    },
    {
      path: 'commandes/:id',
      component: DetailsCommandePageComponent 
    },
    {
      path: 'commandes/get/aLivrer',
      component: AlivrerComponent 
    },
    {
      path: 'restaurants/:idResto/plats',
      component: ListePlatPageComponent 
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
