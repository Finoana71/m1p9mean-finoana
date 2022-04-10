import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    public toast: NbToastrService,
    public userServ: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  restaurant = [];

  onError = (err) =>{
    this.toast.danger(err, "Erreur")
  }

  ngOnInit(): void {
    this.initializeRestaurant();
    this.buildForm();
  }

  initializeRestaurant(){
    const onSuccess = (data) => {
      if(data.status == 200)
      this.restaurant = data.data;
      else
      this.toast.danger(data.message, "Erreur")
    }
    this.userServ.getAllRestaurant().subscribe(onSuccess, this.onError)
  }

  user:any = {
    nom: "",
    motDePasse: "",
    type: "",
    idRestaurant: ""
  }

  buildForm(){
    this.form = this.formBuilder.group({
      "user.nom": [this.user.nom, Validators.required],
      "user.motDePasse": [this.user.email, Validators.required],
      "user.type": [this.user.type, Validators.required],
      "user.email": [this.user.email, [Validators.required, Validators.email]],
      "user.idRestaurant": [this.user.idRestaurant],
    });
  }
  
  valider(){
    if(this.form.invalid || (this.user.type == "Restaurant" && this.user.idRestaurant == "")){
      this.toast.danger("Il y a un ou plusieurs champs non renseignés ou au format differents", "Erreur")
      return;
    }
    const onSuccess = (data) => {
      if(data.status == 200)
        this.router.navigateByUrl("/page/utilisateurs");
      else
      this.toast.danger(data.message, "Erreur")
    }
    this.userServ.nouveau(this.user).subscribe(onSuccess, this.onError);
  }
}
