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

    }
    
  }
  
  inscription(user){
    this.notif.error("Test login")
  }
}
