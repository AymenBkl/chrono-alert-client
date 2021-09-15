import { Component, OnInit, Output, ViewChild,EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal-whatsapp-instructions',
  templateUrl: './modal-whatsapp-instructions.component.html',
  styleUrls: ['./modal-whatsapp-instructions.component.scss']
})
export class ModalWhatsappInstructionsComponent implements OnInit,AfterViewInit {

  @ViewChild('whatsappInstructionModelButton') whatsappInstructionModel:ElementRef;
  @Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(){
    this.whatsappInstructionModel.nativeElement.click();
  }

  closeModal(){
    this.modalClosed.emit(true);
  }

}
