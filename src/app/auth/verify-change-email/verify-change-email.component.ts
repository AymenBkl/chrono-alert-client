import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-verify-change-email',
  templateUrl: './verify-change-email.component.html',
  styleUrls: ['./verify-change-email.component.scss']
})
export class VerifyChangeEmailComponent implements OnInit,AfterViewInit {

  hash:string = '';
  apiResponse : {msg:string,code:number};
  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private ngxSpinnerService: NgxSpinnerService,
              private storageService: StorageService,
              private router:Router) { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkUser();
    },1000)
  }

  getHash(){
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.hash = params['verify'];
        this.activateEmail();
      })
  }

  async checkUser(){
    const user = this.storageService.getUser();
    const jwt = await this.authService.checkJWT(user.email);
    console.log(jwt);
    if (this.authService.user && this.authService.user.emailVerified && this.authService.user.status == 'active' && this.authService.user.newEmail && this.authService.user.newEmail.emailVerified == false){
      this.getHash();
    }
    else {
      this.router.navigate(['/dashboard-client/home']);
    }
  }



  activateEmail(){
    if (this.hash && this.hash != ''){
      console.log(true);
    }
  }

}
