import { Component } from '@angular/core';
import { MessagingService } from './services/messaging-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plataform-events-frontend';
  public readonly VAPID_PUBLIC_KEY = 'BGzCtSrUcTWrqbvo-EWJB-OOUZWJb0fIx2o72n_iv1Oo1QTgDjBTFdCTBE2Yul65asZBvhYlgDXLgTK189bSVek';
  message: any;
  // constructor (private swPush: SwPush){
  //   this.subscribeToNotifications();
  // }

  // subscribeToNotifications(): any {
    
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY
  //   }).then(sub => {
  //     const token = JSON.parse(JSON.stringify(sub));
  //     console.log('*******TOKEN************', token);

  //   }).catch(err => console.error('UPS:( ', err));
    
  // }

  constructor(private messagingService: MessagingService){ }

  ngOnInit(){
    this.messagingService.requestPermission();
    this.messagingService.receiveMessaging();
    this.message = this.messagingService.currentMessage;
  }
}
