import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminDashComponent } from './sidebar-admin-dash.component';

describe('SidebarAdminDashComponent', () => {
  let component: SidebarAdminDashComponent;
  let fixture: ComponentFixture<SidebarAdminDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarAdminDashComponent]
    });
    fixture = TestBed.createComponent(SidebarAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
