import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LandingPageService } from './services/landing-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit,AfterViewInit {

  @ViewChild('errorModalButton') errorModalButton: ElementRef;
  @ViewChild('errorCloseModalButton') errorCloseModalButton: ElementRef;
  constructor(private landingPageService: LandingPageService) { }
  

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.landingPageService.initButtons(this.errorModalButton,this.errorCloseModalButton);
  }

}
