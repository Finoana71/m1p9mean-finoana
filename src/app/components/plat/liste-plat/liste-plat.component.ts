import { PanierService } from './../../../services/panier/panier.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { isClient, isDeconnecte } from '../../../pages/pages-menu';
import { ajoutPanier } from '../../../helpers/panier';
const imageUrl = environment.imageUrl;

@Component({
  selector: 'ngx-liste-plat',
  templateUrl: './liste-plat.component.html',
  styleUrls: ['./liste-plat.component.scss']
})
export class ListePlatComponent implements OnInit {

  imageUrl = imageUrl

  constructor(
    public panierServ: PanierService
  ) { }
  
  isClient = isClient
  isDeconnecte = isDeconnecte

  ngOnInit(): void {
  }

  @Input() plats = [];
}
