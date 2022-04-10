import { Router } from '@angular/router';
import { PlatService } from './../../../services/plat/plat.service';
import { NbToastrService } from '@nebular/theme';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-plat',
  templateUrl: './form-plat.component.html',
  styleUrls: ['./form-plat.component.scss']
})
export class FormPlatComponent implements OnInit {

 
  form: FormGroup;

  constructor(
    public toast: NbToastrService,
    public platServ: PlatService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  onError = (err) =>{
    this.toast.danger(err, "Erreur")
  }

  ngOnInit(): void {
    this.buildForm();
  }

  plat:any = {
    nom: "",
    prixAchat: "",
    prixVente: ""
  }

  buildForm(){
    this.form = this.formBuilder.group({
      "plat.nom": [this.plat.nom, Validators.required],
      "plat.prixAchat": [this.plat.prixAchat, [Validators.required, Validators.min(0)]],
      "plat.prixVente": [this.plat.prixVente, [Validators.required, Validators.min(0)]],
    });
  }
  
  valider(){
    if(this.form.invalid){
      this.toast.danger("Il y a un ou plusieurs champs non renseignés ou au format differents", "Erreur")
      return;
    }
    const onSuccess = (data) => {
      if(data.status == 200)
        this.router.navigateByUrl("/pages/plats");
      else
      this.toast.danger(data.message, "Erreur")
    }
    this.platServ.nouveau(this.plat).subscribe(onSuccess, this.onError);
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
        me.plat.imageFile = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      this.plat.image = target.files[0].name;
    }
  }

}
