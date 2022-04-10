import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'ngx-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit {

  users = []
  constructor(
    private userServ: UserService,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  onError = (err) =>{
    this.toast.danger(err, "Erreur");
  }

  refreshUsers(){
    const onSuccess = (res) =>{
      console.log(res)
      this.users = res.data.data;
    } 
    this.userServ.getAll().subscribe(onSuccess, this.onError);
  }
}
