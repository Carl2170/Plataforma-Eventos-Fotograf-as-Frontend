import { Component, inject } from '@angular/core';
import{ FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../dashboard/services/sweet-alert.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router, public sweetAlert : SweetAlertService){}

  private fb: FormBuilder = inject(FormBuilder);

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
    ]),
    address: new FormControl('', [Validators.required, Validators.minLength(1)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(1)]),

   })

  get name(){
    return this.formRegister.get('name') as FormControl;
  }

  get lastname(){
    return this.formRegister.get('lastname') as FormControl;
  }

  get email(){
    return this.formRegister.get('email') as FormControl;
  }

  get password(){
    return this.formRegister.get('password') as FormControl;
  }

  isFormValid(): boolean {
    return this.formRegister.valid
  }

   onSubmit(){
    
      const formData = {
        name: this.name.value,
        lastname: this.lastname.value,
        email: this.email.value,
        password: this.password.value
      }
      console.log(formData)
      this.authService.postRegister(formData).subscribe(
        (res)=>{
          this.sweetAlert.sweetAlert2('Registro Existoso','Ya has creado una nueva cuenta','success',true,false);
          this.router.navigate(['login']);
          console.log('Backend response: ', res);
       
        },
        (error)=>{
          console.error('Error: ', error);
        }

      );
   
  }
}
