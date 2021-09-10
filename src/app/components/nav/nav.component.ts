import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,AfterViewInit {
  @ViewChild('errorModalButton') errorModalButton: ElementRef;
  @ViewChild('errorCloseModalButton') errorCloseModalButton: ElementRef;
  user:User;
  isLoggedIn:boolean = false;
  subscriberRouter:boolean = false;
  constructor(private landingPageService: LandingPageService,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit() {
    this.routerChanges();

  }

  ngAfterViewInit(): void {
    this.landingPageService.initButtons(this.errorModalButton,this.errorCloseModalButton);
    console.log('called');

  }


  routerChanges(){
    if (!this.subscriberRouter){
      this.checkUser();
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.checkUser();
          this.subscriberRouter = true;

        }
    });
    }
  }

  checkUser(){
    this.isLoggedIn = this.authService.isAuthenticated;
    console.log(this.isLoggedIn,this.authService.isAuthenticated);
  }



}
