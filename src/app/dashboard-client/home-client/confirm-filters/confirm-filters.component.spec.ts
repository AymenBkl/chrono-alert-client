import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFiltersComponent } from './confirm-filters.component';

describe('ConfirmFiltersComponent', () => {
  let component: ConfirmFiltersComponent;
  let fixture: ComponentFixture<ConfirmFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
