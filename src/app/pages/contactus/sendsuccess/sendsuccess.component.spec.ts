import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsuccessComponent } from './sendsuccess.component';

describe('SendsuccessComponent', () => {
  let component: SendsuccessComponent;
  let fixture: ComponentFixture<SendsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
