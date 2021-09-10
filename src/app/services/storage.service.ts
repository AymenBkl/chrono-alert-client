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
    this.removeUser();
  }

  saveUser(user: User){
    localStorage.setItem('user',JSON.stringify(user));
  }

  removeUser(){
    localStorage.removeItem('user');
  }

  getUser(): User{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user;
    }
    else {
      return null;
    }
  }

 
}
