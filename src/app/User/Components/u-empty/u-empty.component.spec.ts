import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UEmptyComponent } from './u-empty.component';

describe('UEmptyComponent', () => {
  let component: UEmptyComponent;
  let fixture: ComponentFixture<UEmptyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UEmptyComponent]
    });
    fixture = TestBed.createComponent(UEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
