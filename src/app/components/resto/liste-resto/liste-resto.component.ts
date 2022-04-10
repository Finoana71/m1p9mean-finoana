import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { getUser, isClient } from '../../../pages/pages-menu';

@Component({
  selector: 'ngx-liste-resto',
  templateUrl: './liste-resto.component.html',
  styleUrls: ['./liste-resto.component.scss']
})
export class ListeRestoComponent implements OnInit {

  imageUrl = environment.imageUrl;
  isClient = isClient;
  getUser = getUser;
  
  constructor() { }

  ngOnInit(): void {
  }

  @Input() restos = []
}
