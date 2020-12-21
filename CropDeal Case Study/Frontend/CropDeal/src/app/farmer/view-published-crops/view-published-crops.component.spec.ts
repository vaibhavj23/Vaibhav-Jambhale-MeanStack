import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublishedCropsComponent } from './view-published-crops.component';

describe('ViewPublishedCropsComponent', () => {
  let component: ViewPublishedCropsComponent;
  let fixture: ComponentFixture<ViewPublishedCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPublishedCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublishedCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
