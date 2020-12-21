import { TestBed } from '@angular/core/testing';

import { RestaurantDataService } from './restaurant-data.service';

describe('RestaurantDataService', () => {
  let service: RestaurantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
