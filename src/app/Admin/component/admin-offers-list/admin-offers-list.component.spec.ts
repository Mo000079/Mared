import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffersListComponent } from './admin-offers-list.component';

describe('AdminOffersListComponent', () => {
  let component: AdminOffersListComponent;
  let fixture: ComponentFixture<AdminOffersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOffersListComponent]
    });
    fixture = TestBed.createComponent(AdminOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
