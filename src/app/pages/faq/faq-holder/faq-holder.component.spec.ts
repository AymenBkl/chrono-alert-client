import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqHolderComponent } from './faq-holder.component';

describe('FaqHolderComponent', () => {
  let component: FaqHolderComponent;
  let fixture: ComponentFixture<FaqHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
