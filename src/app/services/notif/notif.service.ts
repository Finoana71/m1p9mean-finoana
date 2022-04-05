import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private toastr: NbToastrService) { }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2500,
      hasIcon: true,
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastr.show(
      body,
      title,
      config);
  }

  success(message){
    this.showToast("success", "Succès", message);
  }

  error(message){
    this.showToast("danger", "Erreur", message);
  }
  
  warning(message){
    this.showToast("warning", null, message);
  }
  
  info(message){
    this.showToast("info", null, message);
  }
}
