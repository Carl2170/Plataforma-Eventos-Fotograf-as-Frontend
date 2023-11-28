import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiURL : string ="";

  constructor(private http: HttpClient) {
    this.apiURL = `${environment.URL}:${environment.PORT}/api/event`;
   }

  saveEvent(form: any){
    const token = localStorage.getItem('auth');    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return(
       this.http.post(`${this.apiURL}/create`, form, { headers })
     );
  }

  getEventos(){
    const token = localStorage.getItem('auth');    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return(
      this.http.get(`${this.apiURL}/allEvents`, { headers })
    )
  }

  getEvento(idEvent : BigInteger){
    return(
      this.http.get(`${this.apiURL}/get-event/${idEvent}`)
    ) 
  }

  sendMsj(formData : {name : string, description: string, dateTime : string, place : string, receptors : string[]}){
                        
  const token = localStorage.getItem('auth');    
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });
  return(
    this.http.post(`${this.apiURL}/send-msj`,formData , {headers})   
    )
  }

  loadPhotos(idEvent: BigInteger, type: string){
    const token = localStorage.getItem('auth');    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return(
      this.http.get(`${this.apiURL}/load-photos/${idEvent}/${type}` , {headers})   
      )
  }

  loadGuests(idEvent: BigInteger, type: string){
    const token = localStorage.getItem('auth');    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return(
      this.http.get(`${this.apiURL}/load-guests/${idEvent}/${type}` , {headers})   
      )
  }
}
