import { NotifService } from './../../../services/notif/notif.service';
import { CommandeService } from './../../../services/commande/commande.service';
import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'ngx-alivrer',
  templateUrl: './alivrer.component.html',
  styleUrls: ['./alivrer.component.scss']
})
export class AlivrerComponent implements OnInit {

 
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
      this.commandes= resp.data; 
    }
    this.comServ.getALivrer().subscribe(onSuccess, this.onError);
  }

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };
  
  onDragStart(event:DragEvent) {

    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
      
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
  onDraggableMoved(event:DragEvent) {
    
    console.log("draggable moved", JSON.stringify(event, null, 2));
  }
      
  onDragCanceled(event:DragEvent) {
    
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop(event:DndDropEvent) {
  
    console.log("dropped", JSON.stringify(event, null, 2));
  } 
}
