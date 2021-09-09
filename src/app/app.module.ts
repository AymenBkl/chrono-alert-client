import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutes} from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './layouts/home-page/home-page.component';

import { NavbarModule } from 'src/app/components/nav/nav.module';
import { FooterModule } from './components/footer/footer.module';
import { AuthPageComponent } from './layouts/auth-page/auth-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NavbarModule,
    FooterModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthPageComponent,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
