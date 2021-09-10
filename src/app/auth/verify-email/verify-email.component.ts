import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

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
    this.emailSent = true;
    this.submitted = true;
    this.authService.sendVerificationEmail()
      .then((result) => {
        this.submitted = false;
      })
      .catch(err => {
        this.submitted = false;
      })
  }



}
