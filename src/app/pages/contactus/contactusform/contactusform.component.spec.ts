import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusformComponent } from './contactusform.component';

describe('ContactusformComponent', () => {
  let component: ContactusformComponent;
  let fixture: ComponentFixture<ContactusformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
