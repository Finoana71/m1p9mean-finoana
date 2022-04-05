import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'ngx-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
//  protected service: NbAuthService;
protected options: {};
protected cd: ChangeDetectorRef;
protected router: Router;
redirectDelay: number;
showMessages: any;
strategy: string;
errors: string[];
messages: string[];
user: any = {
  email: "",
  motDePasse: "",
};
submitted: boolean = false;
//  socialLinks: NbAuthSocialLink[];
rememberMe: boolean;
formGroup: FormGroup;

constructor(cd: ChangeDetectorRef, router: Router, public formBuilder: FormBuilder, private service: AuthService){
}

inscription(): void{
 this.submitted =  true;
 console.log("llogin")
 this.service.inscription(this.user);
};


ngOnInit(){
 this.buildForm();
}

buildForm(){
  this.formGroup = this.formBuilder.group({
    email: [this.user.email, Validators.required],
    motDePasse: [this.user.motDePasse, [Validators.required, Validators.email]],
    nom: [this.user.motDePasse, Validators.required],
  })
}

get forms(){
  return this.formGroup.controls;
}


}
