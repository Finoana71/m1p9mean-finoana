import { NbToastrService } from '@nebular/theme';
import { RestaurantService } from './../../../services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { isEkaly } from '../../pages-menu';

@Component({
  selector: 'ngx-liste-restaurant-page',
  templateUrl: './liste-restaurant-page.component.html',
  styleUrls: ['./liste-restaurant-page.component.scss']
})
export class ListeRestaurantPageComponent implements OnInit {

  isEkaly = isEkaly;
  restos;
  loading = false;
  constructor(
    private restoServ: RestaurantService,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.refreshRestos();
  }

  onError = (err) =>{
    this.toast.danger(err, "Erreur");
  }

  refreshRestos(){
    this.loading = true;
    const onSuccess = (res) =>{
      console.log(res)
      this.restos = res.data.data;
      this.loading = false;
    } 
    this.restoServ.getAll().subscribe(onSuccess, this.onError);
  }

}
