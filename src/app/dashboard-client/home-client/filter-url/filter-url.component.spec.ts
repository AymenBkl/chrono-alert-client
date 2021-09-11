import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUrlComponent } from './filter-url.component';

describe('FilterUrlComponent', () => {
  let component: FilterUrlComponent;
  let fixture: ComponentFixture<FilterUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
