import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
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
  @Input('modal') modal;
  viewInstructions:boolean = false;
  stepInstruction:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(show:boolean){
    this.stepInstruction = 1;
    this.viewInstructions = show;
  }


  emitWhatsappInstructionNext(step:number){
    this.whatsappInstructionNext.emit({step:step})
  }

  emitWhatsappInstructionPrev(step:number){
    this.whatsappInstructionPrev.emit({step:step})
  }

  nextInstruction(){
    if (this.stepInstruction < 4 && this.stepInstruction > 0){
      this.stepInstruction += 1
    }
  }

  prevInstruction(){
    if (this.stepInstruction < 4 && this.stepInstruction > 0){
      this.stepInstruction -= 1
    }
  }

}
