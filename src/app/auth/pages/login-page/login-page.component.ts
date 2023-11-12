import { Component,inject } from '@angular/core';
import{ FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  errorMessage: string | null = null;

  get email(){
    return this.formLogin.get('email') as FormControl;
  }

  get password(){
    return this.formLogin.get('password') as FormControl;
  }

  formLogin = new FormGroup({
    'email': new FormControl('',[Validators.required,
      Validators.email,
      Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)  
    ]),
    'password': new FormControl('',Validators.required)
  });

  constructor(private router:Router ){}
  
  isFormValid(): boolean {
    return this.formLogin.valid
  }
  authService= inject(AuthService);
 
  onSubmit(){
    if(this.isFormValid()){
      const formData ={
        email: this.email.value,
        password : this.password.value
      }

      this.authService.login(formData).subscribe(
        (res)=>{
        if( 'token' in res){          
          const token = res.token as string
          localStorage.setItem('auth', token);
          this.router.navigate(['home']);
        }
          console.log('Backend response: ', res);
        },
        (error)=>{
          console.error('Error: ', error);
        }
      );
    } else{
      this.formLogin.markAllAsTouched();
    } 


    }
  }