import { Component } from '@angular/core';
import { LoaderService } from './Services/loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mared_project';
loader:BehaviorSubject<boolean>
  constructor(private loaderServ:LoaderService){
    this.loader = this.loaderServ.loader;

  }
}
