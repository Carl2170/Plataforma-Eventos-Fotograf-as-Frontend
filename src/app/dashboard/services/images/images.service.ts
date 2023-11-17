import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiURL: string;
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dfncxpgmk/upload';

  private previewImagesSubject = new BehaviorSubject<string[]>([]);
  previewImages$ = this.previewImagesSubject.asObservable();

  public arrayImagesUpload: string[] = []
  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.URL}:${environment.PORT}/api`;
  }

  
  uploadImage(file: File | string){
    // const formData = new FormData();

    // if( Array.isArray(file)){
    //   console.log("Es un array de string");
      
    //    for (let i = 0; i < file.length; i++) {
    //     const element = file[i];
    //     formData.append('file', element);
    //     formData.append('upload_preset', 'ml_default');
    //     this.http.post(this.cloudinaryUrl, formData).pipe(
    //       map((response: any) => {
    //         return response;
    //         console.log('imagen subida');
    //       }),
    //       catchError((error) => {
    //         console.error('Error en la carga de la imagen:', error);
    //         throw error;
    //       })      
    //     )
    //   }
      
    //   return; 
    // }else{
    //   formData.append('file', file);
    //   formData.append('upload_preset', 'ml_default');
    
    //    this.http.post(this.cloudinaryUrl, formData).pipe(
    //     map((response: any) => {
    //       return response;
    //       console.log('imagen subida');
    //     }),
    //     catchError((error) => {
    //       console.error('Error en la carga de la imagen:', error);
    //       throw error;
    //     })
    //   );
    // }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "ml_default");
  
    return this.http.post(this.cloudinaryUrl, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error en la carga de la imagen:', error);
        throw error;
      })
    );
  }

  saveImageIA(url: string){
    console.log(url);
    
    const idUser = localStorage.getItem('iu')
    const api =`${environment.URL}:${environment.PORT}/api/auth/update-imageIA/${idUser}` 
     return(
        this.http.patch(api, {url})
     );
  }

  addPreviewImage(imageUrls: string []): void {
    const currentPreviews = this.previewImagesSubject.value;
    this.previewImagesSubject.next([...currentPreviews, ...imageUrls]); 
    // this.arrayImagesUpload = imageUrls
    
    for (let index = 0; index < imageUrls.length; index++) {
      this.arrayImagesUpload.push(imageUrls[index]);      
    }
    
  }

  removePreviewImage(index: number): void {
    const currentPreviews = this.previewImagesSubject.value;
    currentPreviews.splice(index, 1);
    this.previewImagesSubject.next([...currentPreviews]);

    this.arrayImagesUpload.splice(index, 1);
    console.log("se elimino: "+ index);
    
  }

  removeAllPreviewImages(): void {
    this.previewImagesSubject.next([]);
    this.arrayImagesUpload = [];
  }

  getArrayImages(){
    return this.arrayImagesUpload;
  }

  existPhotos(){
    return this.arrayImagesUpload.length>0;
  }
}
