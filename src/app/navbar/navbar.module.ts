import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { NavbarLandingPageComponent } from './navbar-landing-page/navbar-landing-page.component';



@NgModule({
  declarations: [
    NavbarHomeComponent,
    NavbarLandingPageComponent
  ],
  exports:[
    NavbarHomeComponent,
    NavbarLandingPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavbarModule { }
