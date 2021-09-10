import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
    this.removeAdmin();
  }

  saveUser(user: User){
    localStorage.setItem('user',JSON.stringify(user));
  }

  removeAdmin(){
    localStorage.removeItem('admin');
  }

  getAdmin(): User{
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) {
      return admin;
    }
    else {
      return null;
    }
  }

 
}
