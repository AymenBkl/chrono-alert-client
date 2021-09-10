import { Routes } from "@angular/router";
import { AuthPageComponent } from "./layouts/auth-page/auth-page.component";
import { DashboardClientComponent } from "./layouts/dashboard-client/dashboard-client.component";
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
    path: 'dashboard-client',
    component: DashboardClientComponent,
    children: [
        {
      path: '',
      loadChildren: ()=> import('./layouts/dashboard-client/dashboard-client.module').then(module => module.DashboarClientPageLayoutModule),
  }]},
  {
    path: '**',
    redirectTo: 'home'
  }
]