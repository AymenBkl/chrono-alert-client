import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthResponse } from '../interfaces/response';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  isAuthenticated: boolean = false;
  updateUserSub: Subscription;
  changePasswordSub: Subscription;
  loginSubscription: Subscription;
  postImageSub: Subscription;
  constructor(private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router) { }



  checkJWT(email: string) {
    return new Promise((resolve, reject) => {
      const token = this.storageService.getToken();
      if (token) {
        console.log(token);
        this.httpClient.get<AuthResponse>(environment.baseUrl + 'auth/checkJWT')
          .subscribe(response => {
            console.log(response);
            if (response.token === 'TOKEN VALID' && response.status === 200) {
              if (response.user.email == email) {
                this.setUserCredentials(response.user);
                resolve(response.user);
              }
              else {
                this.destroyUserCredentials();
                resolve(false);
              }
            }
            else {
              this.destroyUserCredentials();
              resolve(false);
            }
          }, err => {
            console.log(err);
            reject(err);
            this.destroyUserCredentials();
          });
      }
      else {
        resolve(false);
        this.destroyUserCredentials();
      }
    })
  }

  changePassword(oldPassword: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.destroyChangePasswordSub();
      this.changePasswordSub = this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/changepassword', { oldPassword: oldPassword, newPassword: newPassword })
        .subscribe(response => {
          resolve(response)
        }, err => {
          reject(err);
        });

    })
  }

  login(password: string, username: string) {
    return new Promise((resolve, reject) => {
      this.destroyLoginSub();
      this.loginSubscription = this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/login', { password: password, email: username })
        .subscribe(response => {
          console.log(response);
          if (response && response.status == 200) {
            this.storageService.saveToken(response.msg);
            this.setUserCredentials(response.user)
            resolve(response);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(err);
        });

    })
  }

  registerUser(user:User){
    return new Promise((resolve,reject) => {
      this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/register',user)
        .subscribe((result) => {
          console.log(result);
          if (result && result.status == 201){
            this.storageService.saveToken(result.msg);
            this.setUserCredentials(result.user);
            resolve(result);
          }
          else {
            resolve(result);
          }
        },err => {
          reject(err)
        })
    })
  }

  sendVerificationEmail(){
    return new Promise((resolve,reject) => {
      console.log('user',this.user);
      if (this.user && this.user.emailVerified == false){
        this.httpClient.get<AuthService>(environment.baseUrl + 'auth/sendverificationemail')
          .subscribe(result => {
            resolve(result);
          },err => {
            reject(err);
          })
      }
      else {
        console.log('wow');
        this.router.navigate(['/dashboard-client']);
      }
    })
    
  }

  sendVerificationUpdateEmail(){
    return new Promise((resolve,reject) => {
      console.log('user',this.user);
      if (this.user && this.user.newEmail && this.user.newEmail.emailVerified == false){
        this.httpClient.get<AuthService>(environment.baseUrl + 'auth/sendverificationupdateemail')
          .subscribe(result => {
            resolve(result);
          },err => {
            reject(err);
          })
      }
      else {
        console.log('wow');
        this.router.navigate(['/dashboard-client']);
      }
    })
    
  }

  verifyEmail(hash:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<AuthResponse>(environment.baseUrl + 'auth/verifyemail?hash=' + hash)
        .subscribe(result => {
          console.log(result);
          resolve(result);
        },err => {
          reject(err);
          console.log(err);
        }) 
    })
  }

  verifyNewEmail(hash:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<AuthResponse>(environment.baseUrl + 'auth/verifynewemail?hash=' + hash)
        .subscribe(result => {
          console.log(result);
          resolve(result);
        },err => {
          reject(err);
          console.log(err);
        }) 
    })
  }

  sendResetPasswordEmail(email:string){
    return new Promise((resolve,reject) => {
      if (!this.isAuthenticated){
      this.httpClient.get<AuthResponse>(environment.baseUrl + 'auth/sendresetpasswordemail?email=' + email)
        .subscribe(result => {
          console.log(result);
          resolve(result);
        },err => {
          reject(err);
          console.log(err);
        }) 
      }
      else {
        this.router.navigate(['/dashboard-client']);
      }
    })
  
  }

  submitNewPassword(hash:string,password:string){
    return new Promise((resolve,reject) => {
      if (!this.isAuthenticated){
      this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/resetpassword?hash=' + hash,{password:password})
        .subscribe(result => {
          console.log(result);
          resolve(result);
        },err => {
          reject(err);
          console.log(err);
        }) 
      }
      else {
        this.router.navigate(['/dashboard-client']);
      }
    })
  }


  updateUser(user: string, updateUser: User) {
    return new Promise((resolve, reject) => {
      this.destroyUserSub();
      this.updateUserSub = this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/updateuser', { userId: user, updateUser: updateUser })
        .subscribe(response => {
          console.log(response);
          if (response && response.status == 200) {
            this.setUserCredentials(response.user)
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(err);
        });

    })
  }

  updateEmail(newEmail:string){
    return new Promise((resolve,reject) => {
      this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/updateemail',{email:newEmail})
        .subscribe((result) => {
          resolve(result);
        },err => {
          reject(err);
        })
    })
  }

  destroyUserSub() {
    if (this.updateUserSub) {
      this.updateUserSub.unsubscribe();
    }
  }

  destroyLoginSub() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  destroyPostImageSub() {
    if (this.postImageSub) {
      this.postImageSub.unsubscribe();
    }
  }

  destroyChangePasswordSub() {
    if (this.changePasswordSub) {
      this.changePasswordSub.unsubscribe();
    }
  }

  postImage(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.destroyPostImageSub();
      this.postImageSub = this.httpClient.post<AuthResponse>(environment.baseUrl + 'auth/postimage', formData)
        .subscribe(response => {
          console.log(response);
          if (response.status === 200) {
            this.setUserCredentials(response.user)
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  setUserCredentials(user: User) {
    this.isAuthenticated = user.role === 'user';
    this.user = user;
    console.log(this.user);
    this.storageService.saveUser(user);
  }

  destroyUserCredentials() {
    this.isAuthenticated = false;
    this.user = null;
    this.storageService.removeToken();
  }
}
