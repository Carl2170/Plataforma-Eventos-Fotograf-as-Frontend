import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiURL : string ="";

  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.URL}:${environment.PORT}/api`;
  }

 
  getUserProfile(token: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(`${this.apiURL}/user-profile`, { headers });
  }

  updateDataUser(formData: { email: string,name: string,lastname: string, address: string, telephone: string} ){
    const token = localStorage.getItem('auth');
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    
    return(
       this.http.put(`${this.apiURL}/update-profile`, formData, { headers })
     );
  }

  updatePasswordUser(formData: {passUser: string, newPassUser: string} ){
    const idUser = localStorage.getItem('iu')
   const api =`${environment.URL}:${environment.PORT}/api/auth/update-password/${idUser}` 
    return(
       this.http.patch(api, formData)
    );
  }
  
  updateImagesProfile( arrayImages: string []){
    const token = localStorage.getItem('auth');
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return(
       this.http.put(`${this.apiURL}/update-images-profile`,  { arrayAttribute: JSON.stringify(arrayImages) }, { headers })
     );
  }
}
