import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-V-Empty',
  templateUrl: './V-Empty.component.html',
  styleUrls: ['./V-Empty.component.css']
})
export class VEmptyComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() notFoundText: string = "";
  @Input() resetLinkText: string = '';
  @Input() resetLinkRoute: string = '';
  constructor() { }

  ngOnInit() {
  }

}
