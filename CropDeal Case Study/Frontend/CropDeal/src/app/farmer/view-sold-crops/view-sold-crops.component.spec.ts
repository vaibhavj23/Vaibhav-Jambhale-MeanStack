import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSoldCropsComponent } from './view-sold-crops.component';

describe('ViewSoldCropsComponent', () => {
  let component: ViewSoldCropsComponent;
  let fixture: ComponentFixture<ViewSoldCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSoldCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSoldCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
