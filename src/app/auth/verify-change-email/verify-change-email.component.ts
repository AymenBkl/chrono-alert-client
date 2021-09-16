import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthResponse } from 'src/app/interfaces/response';
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
    this.checkUser();
  }

  ngAfterViewInit(): void {
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
      this.ngxSpinnerService.show('spinnerNewEmail');
      this.authService.verifyNewEmail(this.hash)
        .then((result:AuthResponse) => {
          this.ngxSpinnerService.hide('spinnerNewEmail');
          if (result && result.status == 200){
            this.router.navigate(['/dashboard-client/home']);
          }
          else {
            this.apiResponse = {msg:'',code:1001};
          }
        })
        .catch(err => {
          console.log(err);
          this.ngxSpinnerService.hide('spinnerNewEmail');
          this.apiResponse = {msg:'',code:1001};
        })
    }
  }

}
