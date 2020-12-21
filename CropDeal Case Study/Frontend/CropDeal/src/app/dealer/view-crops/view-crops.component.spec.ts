import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCropsComponent } from './view-crops.component';

describe('ViewCropsComponent', () => {
  let component: ViewCropsComponent;
  let fixture: ComponentFixture<ViewCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
