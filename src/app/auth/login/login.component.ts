import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
 import { ChangeDetectorRef } from '@angular/core';
 import { Router } from '@angular/router';
//  import { NbAuthSocialLink } from '../../auth.options';
//  import { NbAuthService } from '../../services/auth.service';
 import * as ɵngcc0 from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
 @Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
 export class LoginComponent implements OnInit{
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
       nom: ""
     };
     submitted: boolean = false;
    //  socialLinks: NbAuthSocialLink[];
     rememberMe: boolean;
     formGroup: FormGroup;

     constructor(public formBuilder: FormBuilder, private service: AuthService){
     }

     login(): void{
      this.submitted =  true;
      console.log("llogin")
      this.service.login(this.user);
     };


     ngOnInit(){
      this.buildForm();
     }

     buildForm(){
       this.formGroup = this.formBuilder.group({
         email: [this.user.email, [Validators.required, Validators.email]],
         motDePasse: [this.user.motDePasse, Validators.required],
       })
     }

     get forms(){
       return this.formGroup.controls;
     }

 }
 
 //# sourceMappingURL=login.component.d.ts.map