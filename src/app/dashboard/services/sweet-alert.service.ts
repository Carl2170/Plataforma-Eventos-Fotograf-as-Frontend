import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  async sweetAlert2(title: string, text: string, icon: SweetAlertIcon, buttonConfirm:boolean,buttonCancel : boolean): Promise<SweetAlertResult> {
    const options: SweetAlertOptions = {
      title: title,
      text: text,
      icon: icon,
     showConfirmButton: buttonConfirm,
      showCancelButton: buttonCancel,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    };
    return Swal.fire(options);
  }
}
