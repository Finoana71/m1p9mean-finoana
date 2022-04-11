import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient
  ) { }

  nouvelle(restaurant){
    let url = apiUrl + "/restaurants";
    return this.http.post(url, restaurant);
  }

  
  getById(id){
    let url = apiUrl + "/restaurants/" + id;
    return this.http.get(url);
  }
  getAll(params = {}){
    let url = apiUrl + "/restaurants";
    return this.http.get(url, {params});
  }
}
