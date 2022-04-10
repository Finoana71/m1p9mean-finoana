import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { RestaurantService } from './../../../services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ajout-resto',
  templateUrl: './ajout-resto.component.html',
  styleUrls: ['./ajout-resto.component.scss']
})
export class AjoutRestoComponent implements OnInit {

  form: FormGroup;

  constructor(
    public toast: NbToastrService,
    public restoServ: RestaurantService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  onError = (err) =>{
    this.toast.danger(err, "Erreur")
  }

  ngOnInit(): void {
    this.buildForm();
  }

  restaurant:any = {
    nom: "",
    adresse: "",
  }

  buildForm(){
    this.form = this.formBuilder.group({
      "restaurant.nom": [this.restaurant.nom, Validators.required],
      "restaurant.adresse": [this.restaurant.adresse, Validators.required],
    });
  }
  
  valider(){
    if(this.form.invalid){
      this.toast.danger("Il y a un ou plusieurs champs non renseignés ou au format differents", "Erreur")
      return;
    }
    const onSuccess = (data) => {
      if(data.status == 200)
        this.router.navigateByUrl("/pages/restaurants");
      else
      this.toast.danger(data.message, "Erreur")
    }
    this.restoServ.nouvelle(this.restaurant).subscribe(onSuccess, this.onError);
  }

  addFile($event){
    const target = $event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let file = target.files[0];
      let me = this;
      
      // Convertir en base 64
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        me.restaurant.imageFile = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      this.restaurant.image = target.files[0].name;
    }
  }


}
