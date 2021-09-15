import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyChangeEmailComponent } from './verify-change-email.component';

describe('VerifyChangeEmailComponent', () => {
  let component: VerifyChangeEmailComponent;
  let fixture: ComponentFixture<VerifyChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyChangeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
