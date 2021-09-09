import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sendsuccess',
  templateUrl: './sendsuccess.component.html',
  styleUrls: ['./sendsuccess.component.scss']
})
export class SendsuccessComponent implements OnInit {

  @Output('closeModal') closeModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeModalEmitter.emit(true);
  }

}
