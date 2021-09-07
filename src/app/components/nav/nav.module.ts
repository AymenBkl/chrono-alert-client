import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    declarations: [ NavComponent ],
    exports: [ NavComponent ]
})

export class NavbarModule {}
