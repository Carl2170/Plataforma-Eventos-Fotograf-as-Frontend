import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent {

  public idEvent  : any
  public event : any;

  public name: any;
  public description: any;
  public date_time: any;

  public emails : string [] =[];
  public newEmail : string = "";
  public emailReceptor : string = "";

  constructor(public eventService: EventsService) { }

  ngOnInit() {
      this.idEvent = localStorage.getItem('idEvent');
    this.getEvento();
    }

  getEvento(){
    return this.eventService.getEvento(this.idEvent).subscribe(
      (res)=>{
        console.log(res);
        this.event = res
        this.name = this.event.name
        this.description = this.event.description
        this.date_time = this.event.date_time
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  async sendInvitation(){

  }
  addEmail() {
    if (this.newEmail.trim() !== '') {
      this.emails.push(this.newEmail);
      this.newEmail = '';
    }
  }

  deleteEmail(index: number){
    this.emails.splice(index,1);
  }

  sendMsj(){
    const formData = {
      name : this.event.name,
      description: this.description,
      dateTime : this.date_time,
      place : "Av. Beni",
      receptors : this.emails
    }

    console.log(formData);
    
    return this.eventService.sendMsj(formData).subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
