import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageClientComponent } from './pages/page-client/page-client.component';
import {DetailsPageComponent} from './pages/details-page/details-page.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FirstLocationFormComponent} from './components/first-location-form/first-location-form.component';
import {WelcomeLeaderComponent} from './components/welcome-leader/welcome-leader.component';
import {MyLocationsComponent} from './components/my-locations/my-locations.component';
import {LocationPageComponent} from './pages/location-page/location-page.component';
import {AddVehicleModalComponent} from './components/add-vehicle-modal/add-vehicle-modal.component';
import {DeleteConfirmationComponent} from './components/delete-confirmation/delete-confirmation.component';
import {LocationReservationsComponent} from './components/location-reservations/location-reservations.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';

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
      {
        path: 'welcome-leader',
        component :WelcomeLeaderComponent
      },
      {
        path : 'first-location',
        component : FirstLocationFormComponent
      },
      {
        path : 'my-locations',
        component : MyLocationsComponent
      },
      {
        path : 'location/:id',
        component : LocationPageComponent
      },
      {
        path : 'location-reservation/:id',
        component : LocationReservationsComponent
      },
      {
        path : 'profile/:username',
        component : MyProfileComponent
      }
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
  ,{
    path : 'test',
    component :  MyProfileComponent
  }

];
