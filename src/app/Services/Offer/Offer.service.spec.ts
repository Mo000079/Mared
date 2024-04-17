/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfferService } from './Offer.service';

describe('Service: Offer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferService]
    });
  });

  it('should ...', inject([OfferService], (service: OfferService) => {
    expect(service).toBeTruthy();
  }));
});
