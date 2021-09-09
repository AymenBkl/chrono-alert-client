import { Component, OnInit } from '@angular/core';
import { LandingPageService } from '../../services/landing-page.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  constructor(private landingPageService: LandingPageService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.landingPageService.hideErrorMessage();
  }

}
