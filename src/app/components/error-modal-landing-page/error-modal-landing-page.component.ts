import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';

@Component({
  selector: 'app-error-modal-landing-page',
  templateUrl: './error-modal-landing-page.component.html',
  styleUrls: ['./error-modal-landing-page.component.scss']
})
export class ErrorModalLandingPageComponent implements OnInit {

  constructor(private landingPageService: LandingPageService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.landingPageService.hideErrorMessage();
  }

}
