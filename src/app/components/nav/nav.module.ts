import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { ErrorModalLandingPageComponent } from '../error-modal-landing-page/error-modal-landing-page.component';

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    declarations: [ NavComponent,ErrorModalLandingPageComponent ],
    exports: [ NavComponent ]
})

export class NavbarModule {}
