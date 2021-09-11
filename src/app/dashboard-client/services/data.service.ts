import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {}

  getJSON(path) {
    return new Promise((resolve,reject) => {
      this.httpClient.get(path)
      .subscribe(data => {
        resolve(data);
      },err => {
        reject(err);
      })
    })

}
}
