import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalLandingPageComponent } from './error-modal-landing-page.component';

describe('ErrorModalLandingPageComponent', () => {
  let component: ErrorModalLandingPageComponent;
  let fixture: ComponentFixture<ErrorModalLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorModalLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
