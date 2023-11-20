import { Component, inject } from '@angular/core';
import{ FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { EventsService } from '../../services/events/events.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  
  private fb: FormBuilder = inject(FormBuilder);

  public events : any;
  public mjsError : string = "";

  public event: string = "";

  public formEvent : FormGroup = this.fb.group({
    name:  ["",Validators.required],
    description: [""],
    date: ["",Validators.required],
    time: ["",Validators.required],    
  })

  
 
  constructor(public eventService : EventsService, 
              public sweetAlertService:SweetAlertService, 
              public router: Router) {}

  get name(){return this.formEvent.get('name') as FormControl}
  get description(){return this.formEvent.get('description') as FormControl}
  get date(){return this.formEvent.get('date') as FormControl}
  get time(){return this.formEvent.get('time') as FormControl}

  ngOnInit(){
    this.getEventos();
  }
  async saveEvent(){
    const data = {
      name: this.name.value,
      description: this.description.value,
      dateTime: `${this.date.value} ${this.time.value}`, 
    }
    const confirmResult = await this.sweetAlertService.sweetAlert2(
      '¿Crear evento?', 'Se creará un nuevo evento','question',true,true);
     if(confirmResult.isConfirmed){
       this.eventService.saveEvent(data).subscribe(
         (res)=>{
           console.log('Backend response: ', res);
            this.sweetAlertService.sweetAlert2(
             'Evento creado', 'Se ha creado un nuevo evento','success',true,false)
           },
           (error)=>{
             console.error('Error: ', error);
           }
         )      
     }
  } 

  async getEventos(){
   this.eventService.getEventos().subscribe(
    (data)=>{
        this.events = data
      console.log(data);
      
        },
    (error)=>{
        if(error.status == 409){
          this.mjsError ="No tiene eventos creados";
        }
      console.log(error);
    }
   )    
  }

  toInvitation(id:string){
    console.log(id);
    localStorage.setItem('idEvent', id);    
    this.router.navigate(['invitations']);
    
  }
}
