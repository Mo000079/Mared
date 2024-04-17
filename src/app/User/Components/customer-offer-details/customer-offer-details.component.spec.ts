import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfferDetailsComponent } from './customer-offer-details.component';

describe('CustomerOfferDetailsComponent', () => {
  let component: CustomerOfferDetailsComponent;
  let fixture: ComponentFixture<CustomerOfferDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerOfferDetailsComponent]
    });
    fixture = TestBed.createComponent(CustomerOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
