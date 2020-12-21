import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedCropsComponent } from './subscribed-crops.component';

describe('SubscribedCropsComponent', () => {
  let component: SubscribedCropsComponent;
  let fixture: ComponentFixture<SubscribedCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
