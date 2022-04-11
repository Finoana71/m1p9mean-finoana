import { CommandeService } from './../../../services/commande/commande.service';
import { NotifService } from './../../../services/notif/notif.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-details-commande-page',
  templateUrl: './details-commande-page.component.html',
  styleUrls: ['./details-commande-page.component.scss']
})
export class DetailsCommandePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private notif: NotifService,
    private comServ: CommandeService
  ) { }

  idCommande;
  ngOnInit(): void {
    this.idCommande = this.route.snapshot.params["id"];
    this.initializeCommande();
  }

  commande;
  initializeCommande(){
    const onError = (err)=>{
      this.notif.error(err)
    }
    const onSuccess = (resp) =>{
      this.commande = resp.data
    }
    this.comServ.getById(this.idCommande).subscribe(onSuccess, onError)
  }

  
}
