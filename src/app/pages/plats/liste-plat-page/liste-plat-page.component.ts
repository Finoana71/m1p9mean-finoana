import { PlatService } from './../../../services/plat/plat.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { isRestaurant } from '../../pages-menu';
import { ActivatedRoute } from '@angular/router';

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
    private toast: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idResto = this.route.snapshot.params["idResto"]; 
    this.refreshPlats();
  }

  onError = (err) =>{
    this.toast.danger(err, "Erreur");
  }

  refreshPlats(){
    const onSuccess = (res) =>{
      // console.log(res)
      this.plats = res.data.data;
    } 
    if(this.idResto)
    this.platServ.getAllPlatResto(this.idResto).subscribe(onSuccess, this.onError);
    else 
      this.platServ.getAll().subscribe(onSuccess, this.onError);
    
  }

}
