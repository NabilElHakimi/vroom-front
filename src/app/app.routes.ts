import { Routes } from '@angular/router';
import { HomePageComponent } from './client/pages/home-page/home-page.component';
import { PageClientComponent } from './client/pages/page-client/page-client.component';
import {DetailsPageComponent} from './client/pages/details-page/details-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'client/home',
    pathMatch: 'full',
  },
  {
    path: 'client',
    component: PageClientComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'details',
        component :DetailsPageComponent
      }
    ]
  }
];
