import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { loginGuard } from '../auth/guards/is-authenticated.guard';
import { BillingComponent } from './pages/billing/billing.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: '',
    component: DashboardLayoutComponent,
    //canActivate:[loginGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'billing', component: BillingComponent },
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
