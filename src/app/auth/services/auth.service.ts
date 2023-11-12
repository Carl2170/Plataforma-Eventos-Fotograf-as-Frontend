import { Injectable, inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiURL: string;

  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.URL}:${environment.PORT}/api`;
  }

  postRegister(userData: {name: string, lastname: string, email:string, password: string}){
    return this.http.post(`${this.apiURL}/register`, userData)
  }

  login(userData: {email:string, password: string}){
    return this.http.post(`${this.apiURL}/login`, userData)
  }

}
