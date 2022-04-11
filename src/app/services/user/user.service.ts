import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  nouveau(user:any){
    let url = apiUrl + "/utilisateurs";
    return this.http.post(url, user);
  }

  getAllRestaurant(){
    let url = apiUrl + "/restaurants/get/all";
    return this.http.get(url);
  }

  getAll(){
    let url = apiUrl + "/utilisateurs";
    return this.http.get(url);
  }

  getById(id){
    let url = apiUrl + "/utilisateurs/" + id;
    return this.http.get(url);
  }
}
