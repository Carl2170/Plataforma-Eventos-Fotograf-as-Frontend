import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiURL : string ="";

  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.URL}:${environment.PORT}/api`;
  }

  getUserData(id :string){
    const api =`${environment.URL}:${environment.PORT}/api/auth/${id}`  
    return (
      this.http.get<any>(api)
    );
  }

  updateDataUser(formData: { email: string,name: string,lastname: string, address: string, telephone: string} ){
    const idUser = localStorage.getItem('iu')
   const api =`${environment.URL}:${environment.PORT}/api/auth/${idUser}` 
    return(
       this.http.patch(api, formData)
     );
  }

  updatePasswordUser(formData: {passUser: string, newPassUser: string} ){
    const idUser = localStorage.getItem('iu')
   const api =`${environment.URL}:${environment.PORT}/api/auth/update-password/${idUser}` 
    return(
       this.http.patch(api, formData)
    );
  }
  
}
