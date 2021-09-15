import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { slideInOut } from '../animations/slideIn';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    slideInOut
  ]
})
export class SettingsComponent implements OnInit {

  user:User;
  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.user = this.authService.user;
  }



}
