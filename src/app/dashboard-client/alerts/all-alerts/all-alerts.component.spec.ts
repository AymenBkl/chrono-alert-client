import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAlertsComponent } from './all-alerts.component';

describe('AllAlertsComponent', () => {
  let component: AllAlertsComponent;
  let fixture: ComponentFixture<AllAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
