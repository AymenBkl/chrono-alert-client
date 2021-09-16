import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year= new Date().getFullYear();
  isLoggedIn:boolean = false;
  subscriberRouter:boolean = false;
  constructor(private authService: AuthService,
              private router:Router) { }

  ngOnInit() {
    this.routerChanges();
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
