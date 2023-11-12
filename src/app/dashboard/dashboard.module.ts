import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BillingComponent } from './pages/billing/billing.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarHomeComponent } from '../navbar/navbar-home/navbar-home.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    BillingComponent,
    HomeComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarModule
    ]
})
export class DashboardModule { }
