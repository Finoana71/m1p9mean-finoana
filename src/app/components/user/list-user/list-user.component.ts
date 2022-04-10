import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @Input() users:any[] = []
}
