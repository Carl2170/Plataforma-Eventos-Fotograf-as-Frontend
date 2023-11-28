import { Component, inject } from '@angular/core';
import { ImagesService } from '../../services/images/images.service';
import { EventsService } from '../../services/events/events.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

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
  idUser: any;
  data:any;

  public formUploadImagesEvent: FormGroup = this.fb.group({
    selectEvent: ['Elija un evento',Validators.required],
    selectEventType: ['Elija una categoría',Validators.required],
    
  })

  constructor( 
    public imagesService : ImagesService,
    public eventService: EventsService
  ){}
  
  ngOnInit(){
    this.getEventos();
  }

  get selectEvent(){return this.formUploadImagesEvent.get('selectEvent')  as FormControl}
  get selectEventType(){return this.formUploadImagesEvent.get('selectEventType')  as FormControl}


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
    try {
      for (let i = 0; i < arrayUpload.length; i++) {
        const element = arrayUpload[i];
        const response = await this.imagesService.uploadImageEvent(element, this.selectEvent.value).toPromise();
        if ('secure_url' in response) {
          const url = response.secure_url as string;
          this.arrayImagesUrl.push(url);
        }
      }
        const formData = {
           arrayImagesUrl: JSON.stringify(this.arrayImagesUrl),
          //arrayImagesUrl: this.arrayImagesUrl,
          event_id: this.selectEvent.value,
          type: this.selectEventType.value
        } ;

        this.imagesService.createImagesEvent(formData).subscribe(
          (res) => {
            this.data =res;
            this.idUser = this.data.userID;
            console.log('response backend: ' + res);
            Swal.fire({
              title: '¡Fotos subidas con éxito!',
              text: 'Fotos añadidas al evento.',
              icon: "success"
            });

            const formData1 = {
             event_id: this.selectEvent.value,
             type: this.selectEventType.value,
             user_id: this.idUser
            };
   
            
            if(this.selectEventType.value =='event'){
              console.log('estoy aca antes de llamar a rekogniton');
              
              this.imagesService.rekognitionIA(formData1).subscribe(
                (res)=>{
                  console.log('resultado de rekognition');
                  
                  console.log(res);
                },
                (error)=>{
                  console.log(error);
                }
              )
            }else{
              console.log('no llamo a rekognition');
            }
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un problema al subir. Intente de nuevo.',
              icon: "error"
            });
          }
        );
    } catch (error) {
        console.log(error);                  
    }
  }
}
