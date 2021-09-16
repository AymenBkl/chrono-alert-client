import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthResponse } from 'src/app/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-now',
  templateUrl: './verify-now.component.html',
  styleUrls: ['./verify-now.component.scss']
})
export class VerifyNowComponent implements OnInit {

  @Input('hash') hash:string;
  emailSubmitted:boolean = false;
  apiResponse : {msg:string,code:number};
  constructor(private ngxSpinnerService: NgxSpinnerService,
              private authService: AuthService,
              private landingPageService: LandingPageService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateEmail();
  }

  activateEmail(){
    if (this.hash && this.hash != ''){
      this.ngxSpinnerService.show();
      this.authService.verifyEmail(this.hash)
        .then((result:AuthResponse) => {
          this.ngxSpinnerService.hide();
          if (result && result.status == 200){
            this.router.navigate(['/dashboard-client']);
          }
          else {
            this.emailSubmitted = true;
            this.apiResponse = {msg:'',code:1001};
          }
        })
        .catch(err => {
          this.ngxSpinnerService.hide();
          this.emailSubmitted = true;
          this.apiResponse = {msg:'',code:1001};
        })
    }
  }


}
