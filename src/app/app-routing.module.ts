import { Routes } from "@angular/router";
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
    path: '**',
    redirectTo: 'home'
  }
]