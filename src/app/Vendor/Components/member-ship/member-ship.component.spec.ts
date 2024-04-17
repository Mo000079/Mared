import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipComponent } from './member-ship.component';

describe('MemberShipComponent', () => {
  let component: MemberShipComponent;
  let fixture: ComponentFixture<MemberShipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberShipComponent]
    });
    fixture = TestBed.createComponent(MemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
