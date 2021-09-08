import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMemembersComponent } from './our-memembers.component';

describe('OurMemembersComponent', () => {
  let component: OurMemembersComponent;
  let fixture: ComponentFixture<OurMemembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurMemembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurMemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
