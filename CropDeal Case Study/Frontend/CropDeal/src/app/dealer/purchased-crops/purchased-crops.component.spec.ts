import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedCropsComponent } from './purchased-crops.component';

describe('PurchasedCropsComponent', () => {
  let component: PurchasedCropsComponent;
  let fixture: ComponentFixture<PurchasedCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
