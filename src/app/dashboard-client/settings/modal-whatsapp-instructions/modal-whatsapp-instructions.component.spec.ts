import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWhatsappInstructionsComponent } from './modal-whatsapp-instructions.component';

describe('ModalWhatsappInstructionsComponent', () => {
  let component: ModalWhatsappInstructionsComponent;
  let fixture: ComponentFixture<ModalWhatsappInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWhatsappInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWhatsappInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
