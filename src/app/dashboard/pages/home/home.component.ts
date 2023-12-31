import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService} from '../../services/profile.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public token: any
  public user: any
  public msjCompletePhotos : any = null
  
  constructor( private router:Router, 
               public activatedRoute:ActivatedRoute,
               public profileServices: ProfileService           
               ){}

  ngOnInit() {
    this.token = localStorage.getItem('auth');
    this.profileServices.getUserProfile(this.token).subscribe(
      (data) => {
        this.user = data        
        if(this.user.imagesProfile.length < 0){
          this.msjCompletePhotos = "Por favor agrege fotos a su perfil";
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  redirectUpload(){
    this.router.navigate(['upload']);
  }
}
