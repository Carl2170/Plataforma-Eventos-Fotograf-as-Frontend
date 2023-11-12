import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-landing-page',
  templateUrl: './navbar-landing-page.component.html',
  styleUrls: ['./navbar-landing-page.component.scss']
})
export class NavbarLandingPageComponent {

  constructor(private router:Router ){}

  isLoginRoute(): boolean {
  return this.router.url.includes('auth/login');
  }

 isRegisterRoute(): boolean{
  return this.router.url.includes('auth/register');
 }
}
