import { TestBed } from '@angular/core/testing';

import { AdvertisementDataService } from './advertisement-data.service';

describe('AdvertisementDataService', () => {
  let service: AdvertisementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
