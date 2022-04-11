import { PlatService } from './../../../services/plat/plat.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { isRestaurant } from '../../pages-menu';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';

@Component({
  selector: 'ngx-liste-plat-page',
  templateUrl: './liste-plat-page.component.html',
  styleUrls: ['./liste-plat-page.component.scss']
})
export class ListePlatPageComponent implements OnInit {

  isRestaurant = isRestaurant

  idResto;

  plats = []

  constructor(
    private platServ: PlatService,
    private restoServ: RestaurantService,
    private toast: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idResto = this.route.snapshot.params["idResto"]; 
    this.refreshPlats();
    this.refreshResto();
  }

  onError = (err) =>{
    this.toast.danger(err, "Erreur");
  }
  
  resto;

  refreshPlats(){
    const onSuccess = (res) =>{
      // console.log(res)
      this.plats = res.data.data;
    } 
    if(this.idResto){
      this.platServ.getAllPlatResto(this.idResto).subscribe(onSuccess, this.onError);
    }
    else 
      this.platServ.getAll().subscribe(onSuccess, this.onError);
  }

  loading = false;
  refreshResto(){
    const onSuccess = (res) =>{
      // console.log(res)
      this.resto = res.data;
      // console.log(this.resto)
      this.loading = false;
    } 
    if(this.idResto){
      this.loading = true;
      this.restoServ.getById(this.idResto).subscribe(onSuccess, this.onError);
    }
    
  }

}
