import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';
import { LandingPageResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  buttonShow:ElementRef;
  buttonClose:ElementRef;
  constructor(private httpClient: HttpClient) { }

  addSubscriber(subscriber:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<LandingPageResponse>(environment.baseUrl + 'landing-page/subscriber',{subscriber:subscriber})
      .subscribe(result => {
        resolve(result);
      },err => {
        reject(err);
      })
    })
    
  }

  addContact(contact:Contact) {
    return new Promise((resolve,reject) => {
      this.httpClient.post<LandingPageResponse>(environment.baseUrl + 'landing-page/contact',contact)
      .subscribe(result => {
        resolve(result);
      },err => {
        reject(err);
      })
    })
  }

  initButtons(buttonShow:ElementRef,buttonClose:ElementRef){
    this.buttonShow = buttonShow;
    this.buttonClose = buttonClose;
  }
  showErrorMessage(){
    this.buttonShow.nativeElement.click();
  }

  hideErrorMessage(){
    this.buttonClose.nativeElement.click();
  }
}
