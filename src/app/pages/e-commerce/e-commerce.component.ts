import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isClient, isDeconnecte, isEkaly, isRestaurant } from '../pages-menu';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
  constructor(
    private router: Router
    ) {
  }

  ngOnInit(){
    if(isClient()||isDeconnecte()||isEkaly())
      this.router.navigateByUrl("/pages/restaurants")
    if(isRestaurant())
      this.router.navigateByUrl("/pages/plats")

  }

}
