import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-u-empty',
  templateUrl: './u-empty.component.html',
  styleUrls: ['./u-empty.component.css']
})
export class UEmptyComponent {
  @Input() visible: boolean = false;
  @Input() notFoundText: string = "";
  @Input() resetLinkText: string = '';
  @Input() resetLinkRoute: string = '';
}
