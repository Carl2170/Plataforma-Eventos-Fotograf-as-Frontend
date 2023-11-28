import { Component } from '@angular/core';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent {
  public idEvent: any;
  public guests: any;
  public photographer: any;
 
  public data: any;
  public nameEvent: string= "";
  msj1: string ="";
  msj2: string ="";

  constructor(private eventService: EventsService){}

  ngOnInit(){
    this.loadGuests();    
  }
  loadGuests(){
    this.idEvent = localStorage.getItem('idEventGuest');

    if(this.idEvent){
      
      this.eventService.loadGuests(this.idEvent,'guest').subscribe(
        (res)=>{
          if('message' in res && res.message === 'NO FOUND'){
            this.msj1 = 'Todavia no hay invitados'
          }          
          this.data = res
          this.guests = this.data.guests
          this.nameEvent = this.data.event
        },
        (error)=>{
          console.log(error, "Error al conseguir la lista de los invitados"); 
        }
      )
      this.eventService.loadGuests(this.idEvent,'photgrapher').subscribe(
        (res)=>{
          if('message' in res && res.message === 'NO FOUND'){
            this.msj2 = 'Todavia no hay fotógrafos'
          }
          this.data = res
          this.photographer = this.data.guests
        },
        (error)=>{
          console.log(error, "Error al conseguir la lista de los fotógrafos"); 
        }
      )
    }
  }
}
