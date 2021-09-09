import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentSubscribeComponent } from './sent-subscribe.component';

describe('SentSubscribeComponent', () => {
  let component: SentSubscribeComponent;
  let fixture: ComponentFixture<SentSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
