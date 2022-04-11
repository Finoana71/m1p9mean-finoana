import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { isClient } from '../../../pages/pages-menu';
const imageUrl = environment.imageUrl;
@Component({
  selector: 'ngx-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.scss']
})
export class DetailsCommandeComponent implements OnInit {

  imageUrl = imageUrl + "/images/plats/";
  @Input() panier;
  isClient = isClient;
  client;
  
  constructor() { }

  ngOnInit(): void {
  }
  
}
