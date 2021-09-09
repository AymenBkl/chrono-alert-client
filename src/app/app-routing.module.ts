import { Routes } from "@angular/router";
import { AuthPageComponent } from "./layouts/auth-page/auth-page.component";
import { HomePageComponent } from "./layouts/home-page/home-page.component";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '',
    component: HomePageComponent,
    children: [
        {
      path: '',
      loadChildren: ()=> import('./layouts/home-page/home-page.module').then(module => module.HomePageLayoutModule),
  }]},
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
        {
      path: '',
      loadChildren: ()=> import('./layouts/auth-page/auth-page.module').then(module => module.AuthPageLayoutModule),
  }]},
  {
    path: '**',
    redirectTo: 'home'
  }
]