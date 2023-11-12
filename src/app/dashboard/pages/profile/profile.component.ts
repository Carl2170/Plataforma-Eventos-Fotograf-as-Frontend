import { Component, inject } from '@angular/core';
import{ FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ProfileService} from '../../services/profile.service'
import { AuthService } from 'src/app/auth/services/auth.service';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private fb: FormBuilder = inject(FormBuilder);
  imageNew: File | null = null;
  user :any 
  plan:string=""
  errorMessage: string | null = null;

  
  public formProfile : FormGroup = this.fb.group({
    nameUser:  ["",Validators.required],
    lastNameUser: ["",Validators.required],
    emailUser: ["",Validators.required],
    addressUser: ["",Validators.required],
    telephoneUser: ["",Validators.required],
    //imagesProfile : [],
    
  })

  public formPassword : FormGroup= this.fb.group({
  passUser :["",Validators.required],
  newPassUser:["",Validators.required],
  confirmPassUser:["",Validators.required]
  })

  
  constructor(private profileService: ProfileService, authService: AuthService ){}

  get nameUser(){return this.formProfile.get('nameUser') as FormControl}
  get emailUser(){return this.formProfile.get('emailUser') as FormControl}
  get lastNameUser(){return this.formProfile.get('lastNameUser') as FormControl}
  get addressUser(){return this.formProfile.get('addressUser') as FormControl}
  get telephoneUser(){return this.formProfile.get('telephoneUser') as FormControl}

  
  get passUser(){return this.formPassword.get('passUser')  as FormControl}
  get newPassUser(){return this.formPassword.get('newPassUser')  as FormControl}
  get confirmPassUser(){return this.formPassword.get('confirmPassUser') as FormControl}
 
  
  async formDataUser(){
    const data = {
      name: this.formProfile.get('nameUser')?.value,
      lastname:  this.formProfile.get('lastnameUser')?.value,
      email: this.formProfile.get('emailUser')?.value,
      address: this.formProfile.get('addressUser')?.value,
      telephone: this.formProfile.get('telephoneUser')?.value
    }

    this.profileService.updateDataUser(data).subscribe(
      (res)=>{
        console.log('Backend response: ', res);
        if('token' in res){
          const token = res.token as string
          localStorage.setItem('auth', token)
        }
        },
        (error)=>{
          console.error('Error: ', error);
        }
      )

  }

  async formDataPass(){
    const formData ={
      passUser : this.formPassword.get('passUser')?.value,
      newPassUser : this.formPassword.get('newPassUser')?.value      
    }
    this.profileService.updatePasswordUser(formData).subscribe(
      (res)=>{
        console.log('Backend response: ', res);
        if('token' in res){
          const token = res.token as string
          localStorage.setItem('auth', token)
        }
        },
        (error)=>{
          if(error.status ==401){
            this.errorMessage="Contraseña actual incorrecta"
          }
          console.error('Error: ', error);
        }
    );
  }
}
