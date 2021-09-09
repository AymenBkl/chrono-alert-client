import { Component,  OnInit,  } from '@angular/core';
import { LandingPageService } from './services/landing-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  
  constructor(private landingPageService: LandingPageService) { }
  

  ngOnInit() {
  }

  

}
