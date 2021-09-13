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

  @Output('whatsappInstructionNext') whatsappInstructionNext: EventEmitter<any> = new EventEmitter;
  @Output('whatsappInstructionPrev') whatsappInstructionPrev: EventEmitter<any> = new EventEmitter;
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(show:boolean){
    this.viewInstructions = show;
  }


  emitWhatsappInstructionNext(step:number){
    this.whatsappInstructionNext.emit({step:step})
  }

  emitWhatsappInstructionPrev(step:number){
    this.whatsappInstructionPrev.emit({step:step})
  }

}
