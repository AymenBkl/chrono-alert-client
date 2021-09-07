import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { clientRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { CoverComponent } from './pages/home/cover/cover.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './pages/home/info/info.component';
import { ApplicationComponent } from './pages/home/application/application.component';
import { HowItWorksComponent } from './pages/home/how-it-works/how-it-works.component';
import { PlansComponent } from './components/plans/plans.component';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MostFollowedModelsComponent } from './pages/home/most-followed-models/most-followed-models.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(clientRoutes, {
      useHash: false
    }),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CoverComponent,
    FooterComponent,
    InfoComponent,
    ApplicationComponent,
    HowItWorksComponent,
    PlansComponent,
    MostFollowedModelsComponent,
    ReviewsComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
