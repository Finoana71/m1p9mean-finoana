import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(
    private http: HttpClient
  ) { }

  nouveau(plat){
    let url = apiUrl + "/plats";
    return this.http.post(url, plat);
  }

  getAll(params = {}){
    let url = apiUrl + "/plats";
    return this.http.get(url, {params});
  }

  getAllPlatResto(idResto, params = {}){
    let url = apiUrl + "/restaurants/" + idResto + "/plats";
    return this.http.get(url, {params});
  }
}
