import { ListePlatPageComponent } from './plats/liste-plat-page/liste-plat-page.component';
import { AjoutPlatPageComponent } from './plats/ajout-plat-page/ajout-plat-page.component';
import { ListUserPageComponent } from './user/list-user-page/list-user-page.component';
import { AddUserPageComponent } from './user/add-user-page/add-user-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ListeRestaurantPageComponent } from './restaurant/liste-restaurant-page/liste-restaurant-page.component';
import { AjoutRestoPageComponent } from './restaurant/ajout-resto-page/ajout-resto-page.component';

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
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
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
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
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
