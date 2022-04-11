import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande/commande.service';
import { NotifService } from '../../../services/notif/notif.service';

@Component({
  selector: 'ngx-liste-commande-page',
  templateUrl: './liste-commande-page.component.html',
  styleUrls: ['./liste-commande-page.component.scss']
})
export class ListeCommandePageComponent implements OnInit {

  commandes;
  constructor(
    private comServ: CommandeService,
    private notif: NotifService
  ) { }

  ngOnInit(): void {
    this.initializeCommande();
  }

  onError = (err) =>{
    this.notif.error(err)
  }

  initializeCommande(){
    const onSuccess = (resp) =>{
      console.log(resp)
      this.commandes= resp.data.data; 
    }
    this.comServ.getAll({}).subscribe(onSuccess, this.onError);
  }

}
