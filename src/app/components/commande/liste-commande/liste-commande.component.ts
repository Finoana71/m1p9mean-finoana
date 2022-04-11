import { Component, Input, OnInit } from '@angular/core';
import { isClient, isEkaly, isRestaurant } from '../../../pages/pages-menu';
import { CommandeService } from '../../../services/commande/commande.service';
import { NotifService } from '../../../services/notif/notif.service';
import { UserService } from '../../../services/user/user.service';

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

  loading = false;

  constructor(
    private comServ: CommandeService,
    private notif: NotifService,
    private userServ: UserService
  ) { }

  onError = (err) =>{
    this.notif.error(err)
  }

  livreurs;

  ngOnInit(): void {
    this.initializeLivreur();
  }

  initializeLivreur(){
    if(!isEkaly())
      return;
    this.loading = false;   
    const onSuccess = (rep) =>{
      this.livreurs = rep.data;
      this.loading = true;
    }
    this.userServ.getAllLivreurs().subscribe(onSuccess, this.onError);
  }

  pretALivrer(i){
    let commande = this.commandes[i];
    this.loading = false;   
    const onSuccess = (rep) =>{
      commande.status = "Pret a livrer";
      this.loading = true;
    }
    this.comServ.pretALivrer(commande._id).subscribe(onSuccess, this.onError);
  }

}
