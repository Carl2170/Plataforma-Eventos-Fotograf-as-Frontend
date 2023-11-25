import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService} from '../../services/profile.service';
// import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public token: any
  public user: any
  public msjCompletePhotos : any = null
  public readonly VAPID_PUBLIC_KEY = 'BGzCtSrUcTWrqbvo-EWJB-OOUZWJb0fIx2o72n_iv1Oo1QTgDjBTFdCTBE2Yul65asZBvhYlgDXLgTK189bSVek';

  respuesta : any;
  constructor( private router:Router, 
               public activatedRoute:ActivatedRoute,
               public profileServices: ProfileService,           
              //  private swPush: SwPush
               ){}

  ngOnInit() {
    this.token = localStorage.getItem('auth');
    this.profileServices.getUserProfile(this.token).subscribe(
      (data) => {
        this.user = data
        console.log(this.user);

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

  redirectUpload(){
    this.router.navigate(['upload']);
  }

  // subscribeToNotifications(): any {
    
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY
  //   }).then(sub => {
  //     const token = JSON.parse(JSON.stringify(sub));
  //     console.log('*******TOKEN************', token);

  //   }).catch(err => console.error('UPS:( ', err));
    
  // }
}
