import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-verify-now',
  templateUrl: './verify-now.component.html',
  styleUrls: ['./verify-now.component.scss']
})
export class VerifyNowComponent implements OnInit {

  @Input('hash') hash:string;
  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.showSpinner();
  }

  showSpinner(){
    if (this.hash && this.hash != ''){
      this.ngxSpinnerService.show();
    }
  }

}
