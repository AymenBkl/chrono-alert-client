import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNowComponent } from './verify-now.component';

describe('VerifyNowComponent', () => {
  let component: VerifyNowComponent;
  let fixture: ComponentFixture<VerifyNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
