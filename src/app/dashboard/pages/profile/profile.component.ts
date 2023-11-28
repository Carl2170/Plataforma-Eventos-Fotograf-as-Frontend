import { Component, inject } from '@angular/core';
import{ FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ProfileService} from '../../services/profile.service'
import { AuthService } from 'src/app/auth/services/auth.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { ImagesService } from '../../services/images/images.service';

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
  token: any
  
  public arrayUrl :string[] =[]
  public arrayUrlCloudinary: string[]=[]
  public imageFiles: File[] = [];

  public arrayImagesProfile :string[] = []
  itemsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;

  public formProfile : FormGroup = this.fb.group({
    nameUser:  ["",Validators.required],
    lastNameUser: ["",Validators.required],
    emailUser: ["",Validators.required],
    addressUser: ["",Validators.required],
    telePhoneUser: ["",Validators.required],
    
  })

  public formPassword : FormGroup= this.fb.group({
  passUser :["",Validators.required],
  newPassUser:["",Validators.required],
  confirmPassUser:["",Validators.required]
  })

  
  constructor(private profileService: ProfileService, 
              private authService: AuthService,
              public imagesService:ImagesService ){}

  sweetAlertService = inject(SweetAlertService);

  get nameUser(){return this.formProfile.get('nameUser') as FormControl}
  get emailUser(){return this.formProfile.get('emailUser') as FormControl}
  get lastNameUser(){return this.formProfile.get('lastNameUser') as FormControl}
  get addressUser(){return this.formProfile.get('addressUser') as FormControl}
  get telePhoneUser(){return this.formProfile.get('telePhoneUser') as FormControl}

  
  get passUser(){return this.formPassword.get('passUser')  as FormControl}
  get newPassUser(){return this.formPassword.get('newPassUser')  as FormControl}
  get confirmPassUser(){return this.formPassword.get('confirmPassUser') as FormControl}
 
  
  ngOnInit() {
    this.token = localStorage.getItem('auth');
    this.profileService.getUserProfile(this.token).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        
        this.loadImages(this.user.imagesProfile);

        this.formProfile.patchValue({
          nameUser:this.user.name,
          lastNameUser: this.user.lastname,
          emailUser: this.user.email,
          addressUser: this.user.address,
          telePhoneUser : this.user.telephone
          }) 
      },
      (error) => {
        console.error(error);
      }
    );
}
  async formDataUser(){
    const data = {
      name: this.nameUser.value,
      lastname:  this.lastNameUser.value,
      email: this.emailUser.value,
      address: this.addressUser.value,
      telephone: this.telePhoneUser.value
    }
    const confirmResult = await this.sweetAlertService.sweetAlert2(
      '¿Estás seguro?', '¿Quieres actualizar tus datos?','question',true,true)
     if(confirmResult.isConfirmed){
       this.profileService.updateDataUser(data).subscribe(
         (res)=>{
           console.log('Backend response: ', res);
           if('token' in res){
             const token = res.token as string
             localStorage.setItem('auth', token)
           }
            this.sweetAlertService.sweetAlert2(
             'Datos actualizados', 'Perfil actualizad','success',false,false)
           },
           (error)=>{
             console.error('Error: ', error);
           }
         )
     }
  }

  async formDataPass(){
    const formData ={
      passUser : this.formPassword.get('passUser')?.value,
      newPassUser : this.formPassword.get('newPassUser')?.value      
    }

    const confirmResult = await this.sweetAlertService.sweetAlert2(
      '¿Estás seguro?', '¿Quieres actualizar tus datos?','question',true,true)
    if(confirmResult.isConfirmed){

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
  
  removePreviewImage(index: number): void {
    this.imagesService.removePreviewImage(index);
  }

  removeAllPreviewImages(): void {
    this.imagesService.removeAllPreviewImages();
  }
  
  onFileSelected(event: any): void {
    const files = event.target.files;

    if (files) {
       const imageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {      
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
       imageUrls.push(imageUrl);
      }
      this.imagesService.addPreviewImage(imageUrls);
    }
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      for (let index = 0; index < input.files.length; index++) {
        this.imageFiles.push(input.files[index]);
      }
    }

  }

  async uploadImages(){
    const arrayUpload = this.imageFiles
      console.log(arrayUpload);
      try {
        for (let i = 0; i < arrayUpload.length; i++) {
          const element = arrayUpload[i];
          const response = await this.imagesService.uploadImage(element).toPromise();
          if ('secure_url' in response) {
            const url = response.secure_url as string;
            this.arrayUrl.push(url);
          }
        }
          const form =  this.arrayUrl;
         //const form =  ['uno', 'dos', 'tres']; 
         console.log(form);
          
          this.profileService.updateImagesProfile(form).subscribe(
            (res) => {
              console.log('response backend: ' + res);
              this.sweetAlertService.sweetAlert2('Añadidas con éxito','Imagenes añadidas al perfil','success', false, false);
            },
            (error) => {
              console.error('Error:', error);
            }
          )
       
      } catch (error) {
          console.log(error);                  
      }
  }

  existPhotos(){
    return this.imagesService.existPhotos();
  }

  loadImages(images:string[]) {
    this.arrayImagesProfile = images
    this.calculateTotalPages(); // Calcular el número total de páginas al obtener las imágenes
    this.changePage(1); // Cargar la primera página
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.arrayImagesProfile.length / this.itemsPerPage);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

}
