import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,AfterViewInit {
  @ViewChild('errorModalButton') errorModalButton: ElementRef;
  @ViewChild('errorCloseModalButton') errorCloseModalButton: ElementRef;
  constructor(private landingPageService: LandingPageService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.landingPageService.initButtons(this.errorModalButton,this.errorCloseModalButton);
  }

}
