import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/interfaces/response';
import { SocialResponse } from 'src/app/interfaces/telegram';
import { UrlNotificationResponse, UrlResponse } from 'src/app/interfaces/url';
import { environment } from 'src/environments/environment';
import { Plan } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addPlan(plan:Plan){
    return new Promise((resolve,reject) => {
      this.httpClient.post<AuthResponse>(environment.baseUrl + 'user/addplan',{plan:plan})
        .subscribe((result) => {
          console.log(result);
          resolve(result);
        },err => {
          console.log(err);
          reject(err);

        })
    })
  }

  addUrl(url:any){
    return new Promise((resolve,reject) => {
      this.httpClient.post(environment.baseUrl + 'user/addurl',url)
        .subscribe((result) => {
          resolve(result);
        },err => {
          reject(err);
        })
    })
  }

  getUrls(){
    return new Promise((resolve,reject) => {
      this.httpClient.get<UrlNotificationResponse>(environment.baseUrl + 'user/urls')
        .subscribe((result) => {
          resolve(result);
        },err => {
          reject(err);
        })
    })
  }

  blockUrl(status:any,urlId:string,type:string){
    return new Promise((resolve,reject) => {
      this.httpClient.post<UrlResponse>(environment.baseUrl + 'user/manipulateurl?type=' + type,{status:status,urlId:urlId})
        .subscribe((result) => {
          resolve(result);
        },err => {
          reject(err);
        })
    })
  }

  socialUpdate(social:string){
    return new Promise((resolve,reject) => {
      this.httpClient.get<SocialResponse>(environment.baseUrl + 'user/manipulatesocial?social=' + social)
      .subscribe((result) => {
        resolve(result);
      },err => {
        reject(err);
      })
    })
  }

  socialDelete(social:string){
    return new Promise((resolve,reject) => {
      this.httpClient.delete<SocialResponse>(environment.baseUrl + 'user/deletesocial?social=' + social)
      .subscribe((result) => {
        resolve(result);
      },err => {
        reject(err);
      })
    })
    
  }
}
