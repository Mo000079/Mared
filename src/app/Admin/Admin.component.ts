import { Component} from '@angular/core';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent  {
  isCollapse: boolean = false;

    constructor() { }

  collapse() {
    console.log('colapse');
    if (!this.isCollapse) {
      this.isCollapse = true;
    } else {
      this.isCollapse = false;
    }
  }
}


