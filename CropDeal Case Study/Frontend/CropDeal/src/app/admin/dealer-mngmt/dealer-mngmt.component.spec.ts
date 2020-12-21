import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerMngmtComponent } from './dealer-mngmt.component';

describe('DealerMngmtComponent', () => {
  let component: DealerMngmtComponent;
  let fixture: ComponentFixture<DealerMngmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerMngmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerMngmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
