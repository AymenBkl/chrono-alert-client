import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  hash:string = '';
  emailSent:boolean = false;
  submitted:boolean = false;
  @ViewChild('sendSuccessModal') sendSuccessModal:ElementRef;
  @ViewChild('closeButton') closeButton:ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.getHash();
  }


  getHash(){
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.hash = params['verify'];
       
      })
  }


  sendEmail(){
    this.submitted = true;
    this.authService.sendVerificationEmail()
      .then((result:AuthResponse) => {
        this.submitted = false;

        if (result && result.status == 200){
          this.openSuccessModal();
        }
        else {
          this.emailSent = true;
          this.landingPageService.showErrorMessage();
        }
      })
      .catch(err => {
        this.submitted = false;
        this.emailSent = true;
        this.landingPageService.showErrorMessage();
      })
  }

  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }



}
