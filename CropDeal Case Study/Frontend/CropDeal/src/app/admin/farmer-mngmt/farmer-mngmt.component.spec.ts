import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMngmtComponent } from './farmer-mngmt.component';

describe('FarmerMngmtComponent', () => {
  let component: FarmerMngmtComponent;
  let fixture: ComponentFixture<FarmerMngmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerMngmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerMngmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
