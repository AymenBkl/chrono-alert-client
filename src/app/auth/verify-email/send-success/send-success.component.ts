import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-success',
  templateUrl: './send-success.component.html',
  styleUrls: ['./send-success.component.scss']
})
export class SendSuccessComponent implements OnInit {

  @Output('closeModal') closeModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeModalEmitter.emit(true);
  }

}
