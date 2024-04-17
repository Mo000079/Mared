import { TestBed } from '@angular/core/testing';

import { ShopServicesService } from './shop-services.service';

describe('ShopServicesService', () => {
  let service: ShopServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
