import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthResponse } from '../interfaces/response';
import { StorageService } from './storage.service';
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
    private storageService: StorageService) { }



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
          if (response && response.status == 200) {
            resolve(response.user);
          }
          else {
            resolve(false);
          }
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
    this.storageService.saveUser(user);
  }

  destroyUserCredentials() {
    this.isAuthenticated = false;
    this.user = null;
    this.storageService.removeToken();
  }
}
