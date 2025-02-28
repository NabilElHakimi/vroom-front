import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageClientComponent } from './pages/page-client/page-client.component';
import {DetailsPageComponent} from './pages/details-page/details-page.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {
  LeaderPropositionAlertComponent
} from './components/leader-proposition-alert/leader-proposition-alert.component';

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
        path: 'details/:id',
        component :DetailsPageComponent
      },

    ]
  },

  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  }


];
