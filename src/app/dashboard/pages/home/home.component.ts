import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private router:Router){}
  profileServices = inject(ProfileService);

  ngOnInit() {
    this.token = localStorage.getItem('auth');
    this.profileServices.getUserProfile(this.token).subscribe(
      (data) => {
        this.user = data
        console.log(this.user.imagesProfile);
        
        if(this.user.imagesProfile.length < 0){
          this.msjCompletePhotos = "Por favor agrege fotos a su perfil";
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }
 
}
