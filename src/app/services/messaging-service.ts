import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireMessaging } from "@angular/fire/messaging/messaging"
export class MessagingService{
    currentMessage = new BehaviorSubject<any>(null);

    constructor( private angularFireMessaging: Angular)
}