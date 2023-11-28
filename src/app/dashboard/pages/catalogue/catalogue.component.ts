import { Component } from '@angular/core';
import { ImagesService } from '../../services/images/images.service';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  
  public titleEvent: string= "";
  public photosPublic:  string[] =[];
  public photosEvent: string[] =[];
  public idEvent: any;

  public data: any;
  public data1: any;
  public nameEvent:any;

  public msj1 : string =""
  public msj2 : string =""

  constructor(public eventService : EventsService){}

  ngOnInit(){
    this.loadPhotos();
  }

  loadPhotos(){
    this.idEvent = localStorage.getItem('idEventPhotos');

    if(this.idEvent){
      this.eventService.loadPhotos(this.idEvent,'public').subscribe(
        (res)=>{
          if('message' in res && res.message === 'NO FOUND'){
            this.msj1 = 'Todavia no han subido fotos'
          }
          this.data = res
          this.photosPublic = this.data.photos
          this.nameEvent = this.data.event
        },
        (error)=>{
          console.log(error, "Error al conseguir las fotos publicas"); 
        }
      )
      this.eventService.loadPhotos(this.idEvent,'event').subscribe(
        (res)=>{
          if('message' in res && res.message === 'NO FOUND'){
            this.msj2 = 'Todavia no han subido fotos'
          }
          this.data1 = res
            this.photosEvent =this. data1.photos
            console.log(this.photosEvent);
        },
        (error)=>{
          console.log(error, "Error al conseguir las fotos solo del evento"); 
        }
      )
    }
  }
}
