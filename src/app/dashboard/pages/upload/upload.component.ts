import { Component, inject } from '@angular/core';
import { ImagesService } from '../../services/images/images.service';
import { EventsService } from '../../services/events/events.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({

  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  private fb: FormBuilder = inject(FormBuilder);

  public image: File | null = null;
  selectedFileName: string = 'Sube o Arrastra tu Imagen';
  public imageFiles: File[] = [];
  public  imageUrls: string[] = []
  itemsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;

  public arrayImagesUrl: string[] = []
  events: any;
  mjsError: string = "";



  public formUploadImagesEvent: FormGroup = this.fb.group({
    selectEvent: ["",Validators.required]
  })

  constructor( 
    public imagesService : ImagesService,
    public eventService: EventsService
  ){}
  
  ngOnInit(){
    this.getEventos();
  }
  onFileSelected(event: any): void {

    const files = event.target.files;

    if (files) {
      
      for (let i = 0; i < files.length; i++) {      
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
       this.imageUrls.push(imageUrl);
      }
      this.imagesService.addPreviewImage(this.imageUrls);
    }

    const input = event.target as HTMLInputElement;
    
    if (input?.files) {
      for (let index = 0; index < input.files.length; index++) {
        this.imageFiles.push(input.files[index]);
      }
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

  removePreviewImage(index: number): void {
    this.imagesService.removePreviewImage(index);
  }

  removeAllPreviewImages(): void {
    this.imagesService.removeAllPreviewImages();
  }
 
  verifArrayImages(){
    return this.imageFiles.length > 0;
  }

  async uploadImagesEvent(){
    const arrayUpload = this.imageFiles
    console.log(arrayUpload);
    try {
      for (let i = 0; i < arrayUpload.length; i++) {
        const element = arrayUpload[i];
        const response = await this.imagesService.uploadImage(element).toPromise();
        if ('secure_url' in response) {
          const url = response.secure_url as string;
          this.arrayImagesUrl.push(url);
        }
      }
        const form =  this.arrayImagesUrl;
        
        // this.profileService.updateImagesProfile(form).subscribe(
        //   (res) => {
        //     console.log('response backend: ' + res);
        //     this.sweetAlertService.sweetAlert2('Añadidas con éxito','Imagenes añadidas al perfil','success', false, false);
        //   },
        //   (error) => {
        //     console.error('Error:', error);
        //   }
        // )
     
    } catch (error) {
        console.log(error);                  
    }
  }
}
