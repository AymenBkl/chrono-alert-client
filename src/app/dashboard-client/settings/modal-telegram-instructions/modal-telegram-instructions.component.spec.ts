import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTelegramInstructionsComponent } from './modal-telegram-instructions.component';

describe('ModalTelegramInstructionsComponent', () => {
  let component: ModalTelegramInstructionsComponent;
  let fixture: ComponentFixture<ModalTelegramInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTelegramInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTelegramInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
