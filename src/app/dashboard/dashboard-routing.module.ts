import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { loginGuard } from '../auth/guards/is-authenticated.guard';
import { BillingComponent } from './pages/billing/billing.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventsComponent } from './pages/events/events.component';
import { InvitationsComponent } from './pages/invitations/invitations.component';

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

      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
