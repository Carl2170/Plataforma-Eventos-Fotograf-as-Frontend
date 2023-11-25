import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireMessaging } from "@angular/fire/compat/messaging"

@Injectable({
    providedIn: 'root', // Esto lo proporcionará en el nivel raíz de la aplicación
  })
  
export class MessagingService{
    currentMessage = new BehaviorSubject<any>(null);

    constructor( private messaging: AngularFireMessaging ){

    }

    requestPermission(){
        this.messaging.requestToken.subscribe((token)=>{
            console.log(token);
        },(err)=>{
            console.log("unable to get permission to notify..", err);
            
        })
    }

    receiveMessaging(){
        this.messaging.messages.subscribe((payload)=>{
            console.log("new message received: ", payload)
            this.currentMessage.next(payload)
        })
    }

}