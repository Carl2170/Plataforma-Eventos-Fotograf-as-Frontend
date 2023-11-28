import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService} from '../../dashboard/services/profile.service'

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss',
  ]

})
export class NavbarHomeComponent {
  public token : any;
  public user : any;
  public name : string = "";
  public subscription : string = "";
  constructor(private router:Router, private profileService: ProfileService ){}

  ngOnInit(){
    this.token = localStorage.getItem('auth');
    this.profileService.getUserProfile(this.token).subscribe(
      (data) => {        
        this.user = data;
        this.name = this.user.name;
        //constante por el momento
        this.subscription = "Free";        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  redirectProfile(){
    this.router.navigate(['profile']);
  }

  redirectEvents(){
    this.router.navigate(['event']);
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
