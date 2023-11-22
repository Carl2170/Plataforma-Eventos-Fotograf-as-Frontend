import { Component } from '@angular/core';
import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  public image: File | null = null;
  selectedFileName: string = 'Sube o Arrastra tu Imagen';
  public imageFiles: File[] = [];
  public  imageUrls: string[] = []
  itemsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;
  public arrayImagesProfile :string[] = []


  constructor( public imagesService : ImagesService
             ){}
  
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

  removePreviewImage(index: number): void {
    this.imagesService.removePreviewImage(index);
  }

  removeAllPreviewImages(): void {
    this.imagesService.removeAllPreviewImages();
  }
 
  verifArrayImages(){
    return this.imageFiles.length > 0;
  }
}
