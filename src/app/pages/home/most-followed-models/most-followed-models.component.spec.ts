import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFollowedModelsComponent } from './most-followed-models.component';

describe('MostFollowedModelsComponent', () => {
  let component: MostFollowedModelsComponent;
  let fixture: ComponentFixture<MostFollowedModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostFollowedModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostFollowedModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
