import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { slideInOut } from '../../animations/slideIn';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
  animations: [
    slideInOut
  ]
})
export class WhatsappComponent implements OnInit {

  @Output('whatsappInstruction') whatsappInstruction: EventEmitter<any> = new EventEmitter;
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(show:boolean){
    this.viewInstructions = show;
  }


  emitWhatsappInstruction(step:number){
    this.whatsappInstruction.emit({step:step})
  }

}
