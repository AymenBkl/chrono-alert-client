import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import { SentSubscribeComponent } from './sent-subscribe/sent-subscribe.component';
import { FooterClientComponent } from './footer-client/footer-client.component';

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    declarations: [ FooterComponent, SubscriberFormComponent, SentSubscribeComponent, FooterClientComponent ],
    exports: [ FooterComponent ]
})

export class FooterModule {}
