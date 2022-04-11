import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../environments/environment';
import { CommandeService } from '../../services/commande/commande.service';
import { PanierService } from '../../services/panier/panier.service';
import { isClient, isDeconnecte } from '../pages-menu';
const imageUrl = environment.imageUrl;

@Component({
  selector: 'ngx-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent implements OnInit {

  imageUrl = imageUrl + "/plats/"

  constructor(
    public panierServ: PanierService,
    public toast: NbToastrService,
    public comServ: CommandeService
  ) { }

  panier;
  isClient = isClient;
  isDeconnecte = isDeconnecte;
  ngOnInit(): void {
    this.panier = this.panierServ.getPanier();
  }

  loading=false;
  supprimer(i){
    this.loading = true;
    setTimeout(()=>{
      this.panier.plats.splice(i, 1);
      this.loading = false;    
    }, 200)
  }

  changeQte(i){
    if(this.panier.plats[i].quantite <= 0)
      this.panier.plats.splice(i, 1);
  }

  mettreAjour(){
    this.loading = true;
    setTimeout(()=>{
      localStorage.setItem("panier", JSON.stringify(this.panier));
      this.loading = false;
      this.toast.info("Mise à jour avec succès", "Information");
    }, 200)
  }

  valider(){
    this.loading = true;
    setTimeout(()=>{
      this.comServ.creer();
      this.loading = false;
    }, 300)
  }
}
