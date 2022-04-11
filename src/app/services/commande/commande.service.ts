import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NotifService } from '../notif/notif.service';
import { PanierService } from '../panier/panier.service';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  constructor(
    private http: HttpClient,
    private router: Router,
    private panierServ: PanierService,
    private notif: NotifService
  ) { }

  
  onError = (err) =>{
    if(err.status == 404)
      this.notif.error("Il y a une erreur au serveur");
    else
    this.notif.error(err);
  }

  creerObservable(commande){
    let url = apiUrl + "/commandes";
    return this.http.post(url, commande);
  }

  creer(){
    let commande = this.panierServ.getPanier();
    const onSuccess = (data)=>{
      this.notif.success("Commande envoyée avec succès");
      localStorage.removeItem("panier")
      this.router.navigateByUrl("/pages/restaurants")
      setTimeout(()=>{
        location.reload();
      }, 100)
    }
    this.creerObservable(commande).subscribe(onSuccess, this.onError)
  }

  getAll(params){
    let url = apiUrl + "/commandes";
    return this.http.get(url, {params});
  }
}
