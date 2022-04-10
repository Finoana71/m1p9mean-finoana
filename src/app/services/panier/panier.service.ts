import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(
    private toast: NbToastrService
  ) { }

  genererPanier(){
    let panier = {
        // idRestaurant: idRestaurant,
        plats: [],
        prixAchat: 0,
        prixVente: 0
    };
    return panier;
  }

  getPanier(){
      let panier = JSON.parse(localStorage.getItem("panier"));
      if(!panier){
          panier = this.genererPanier()
          localStorage.setItem("panier", JSON.stringify(panier))
      }
      return panier;
  }

  genererPlatPanier(plat){
      let rep:any = {};
      rep.nom = plat.nom;
      rep.prixAchat = plat.prixAchat;
      rep.priVente = plat.priVente;
      rep.image = plat.image;
      rep.quantite = 1;
      return rep;
  }

  ajouterPlatPanier(plat, panier){
      let platAjout = this.genererPlatPanier(plat);
      let plats = panier.plats;
      let ind = 0;
      for(let i = 0; i < plats.length; i++){
          if(plats[i].nom == platAjout.nom){
              plats[i].quantite++;
              this.toast.success("Le plat " + plat.nom + " est ajouté au panier(quantité:" + plats[i].quantite + ")");
              ind++;
              break;
          }
      }
      if(ind == 0){
        plats.push(platAjout)
        this.toast.success("Le plat " + plat.nom + " est ajouté au panier");
      }
      panier.prixVente += plat.prixVente;
      panier.prixAchat += plat.prixAchat;
  }

  ajouterPanier(plat){
      let panier = this.getPanier();
      if(panier.plats.length != 0 && plat.idRestaurant != panier.idRestaurant){
          this.toast.warning("Vous avez changé de restaurant, les plats de l'ancien seront supprimés")
          panier.plats.splice(0, panier.plats.length);    
          panier.prixVente = 0;
          panier.prixAchat = 0;    
      }
      panier.idRestaurant = plat.idRestaurant;
      this.ajouterPlatPanier(plat, panier);
      localStorage.setItem("panier", JSON.stringify(panier))
  }

}
