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
    if(err.status == 404)
      this.notif.error("Il y a une erreur au serveur");
    else
    this.notif.error(err);
  }

  login(user){
    const onSuccess = (response) =>{
      localStorage.setItem("user", JSON.stringify(response.data));
      this.router.navigateByUrl("/dashboard");
      // window.location.reload();
      // setTimeout(() =>{
      //   location.reload()        
      // }, 500)
    }
    let url = apiUrl + "/utilisateurs/connexion";
    this.http.post(url, user).subscribe(onSuccess, this.onError);
  }
  
  inscription(user){
    const onSuccess = (response) =>{
      this.notif.success("Veuillez vérifier votre mail pour valider l'inscription");
    }
    let url = apiUrl + "/utilisateurs/inscription";
    this.http.post(url, user).subscribe(onSuccess, this.onError);
  }

  getUser(){
    return JSON.parse(localStorage.getItem("user"));
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth");
    setTimeout(()=>{
      location.reload();
    }) 
  }
}
