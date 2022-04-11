import { Component, Input, OnInit } from '@angular/core';
import { isClient, isEkaly, isRestaurant } from '../../../pages/pages-menu';

@Component({
  selector: 'ngx-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.scss']
})
export class ListeCommandeComponent implements OnInit {

  @Input() commandes;

  isClient = isClient
  isEkaly = isEkaly
  isRestaurant = isRestaurant

  constructor() { }

  ngOnInit(): void {
  }

}
