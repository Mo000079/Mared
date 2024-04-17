import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin-dash',
  templateUrl: './sidebar-admin-dash.component.html',
  styleUrls: ['./sidebar-admin-dash.component.css']
})
export class SidebarAdminDashComponent implements OnChanges{
  @Input() isCollapse?: boolean;

  ngOnChanges() {
    console.log('object');
    console.log(this.isCollapse);
  }
}
