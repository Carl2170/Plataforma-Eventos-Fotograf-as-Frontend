import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss',
              '../landing-page/css/bootstrap.min.css',
              '../landing-page/css/bootstrap-theme.css',
              '../landing-page/css/bootstrap-theme.min.css',
              '../landing-page/css/fontAwesome.css',
              '../landing-page/css/hero-slider.css',
              '../landing-page/css/bootstrap.css',

  ]

})
export class NavbarHomeComponent {

  constructor(private router:Router ){}

  redirectProfile(){
    this.router.navigate(['profile']);
  }
  logout(){
    localStorage.removeItem('auth');
    this.router.navigate(['auth/login']);
  }

  isProfilelRoute(): boolean {
    return this.router.url.includes('auth/login');
  }

  verifRoute(route:string): boolean {
    return this.router.url.includes(route);
  }
}
