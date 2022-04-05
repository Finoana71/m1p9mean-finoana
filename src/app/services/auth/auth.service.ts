import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { NotifService } from './../notif/notif.service';
import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private notif: NotifService, private router: Router, private http: HttpClient) { }

  onError = (err) =>{
    this.notif.error(err);
  }

  login(user){
    const onSuccess = (response) =>{
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigateByUrl("");
      window.location.reload();
    }
    let url = apiUrl + "/users/connexion";
    this.http.post(url, user).subscribe(onSuccess, this.onError);
  }
  
  inscription(user){
    const onSuccess = (response) =>{
      this.notif.success("Veuillez vérifier votre mail pour valider l'inscription");
    }
    let url = apiUrl + "/users/inscription";
    this.http.post(url, user).subscribe(onSuccess, this.onError);

  }
}
