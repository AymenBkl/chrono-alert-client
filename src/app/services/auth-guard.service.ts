import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService) { }

  async canActivate(): Promise<boolean> {
    const user = this.storageService.getUser();
    if (user){
      const newUser:any = await Promise.resolve(this.authService.checkJWT(user.email));
      console.log(newUser);
      if (this.authService.isAuthenticated) {
        if (newUser && newUser != false && newUser.emailVerified == true){
          return Promise.resolve(true);
        }
        else if (newUser && newUser != false && newUser.emailVerified == false){
          this.router.navigate(['/auth/verify-email']);
          return Promise.resolve(false);
        }
        else {
          this.router.navigate(['/auth']);
          return Promise.resolve(false);
        }
      }
      else {
        this.router.navigate(['/auth']);
        return Promise.resolve(false);
      }
    }
    else {
      this.router.navigate(['/auth']);
      return Promise.resolve(false);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UnLoggedGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService) { }

  async canActivate(): Promise<boolean> {
    const user = this.storageService.getUser();
    if (user){
      const newUser:any = await Promise.resolve(this.authService.checkJWT(user.email));
      console.log(newUser);
      if (this.authService.isAuthenticated) {
        if (newUser && newUser != false && newUser.emailVerified == true){
          this.router.navigate(['/dashboard-client']);
          return Promise.resolve(false);
        }
        else if (newUser && newUser != false && newUser.emailVerified == false){
          this.router.navigate(['/auth/verify-email']);
          return Promise.resolve(false);
        }
        else {
          return Promise.resolve(true);
        }
      }
      else {
        return Promise.resolve(true);
      }
    }
    else {
      return Promise.resolve(true);
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuardVerifyEmailService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService) { }

  async canActivate(): Promise<boolean> {
    const user = this.storageService.getUser();
    if (user){
      const newUser:any = await Promise.resolve(this.authService.checkJWT(user.email));
      console.log(newUser);
      if (this.authService.isAuthenticated) {
        if (newUser && newUser != false && newUser.emailVerified == true){
          this.router.navigate(['/dashboard-client']);
          return Promise.resolve(false);
        }
        else if (newUser && newUser != false && newUser.emailVerified == false){
          return Promise.resolve(true);
        }
        else {
          this.router.navigate(['/auth']);
          return Promise.resolve(false);
        }
      }
      else {
        this.router.navigate(['/auth']);
        return Promise.resolve(false);
      }
    }
    else {
      this.router.navigate(['/auth']);
      return Promise.resolve(false);
    }
  }
}
