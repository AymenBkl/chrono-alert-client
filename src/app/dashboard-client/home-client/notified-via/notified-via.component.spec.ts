import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiedViaComponent } from './notified-via.component';

describe('NotifiedViaComponent', () => {
  let component: NotifiedViaComponent;
  let fixture: ComponentFixture<NotifiedViaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiedViaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiedViaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
