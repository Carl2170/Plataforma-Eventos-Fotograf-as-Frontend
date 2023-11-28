import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { loginGuard } from '../auth/guards/is-authenticated.guard';
import { BillingComponent } from './pages/billing/billing.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventsComponent } from './pages/events/events.component';
import { InvitationsComponent } from './pages/invitations/invitations.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { GuestsComponent } from './pages/guests/guests.component';

const routes: Routes = [
  { path: '',
    component: DashboardLayoutComponent,
    //canActivate:[loginGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'profile', component: ProfileComponent},
      { path: 'event', component: EventsComponent},
      { path: 'invitations', component: InvitationsComponent},
      { path: 'upload', component:UploadComponent},
      { path: 'catalogues', component:CatalogueComponent},
      { path: 'guests', component:GuestsComponent},

      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
