import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  IsSend: boolean= false;
  name: string='';
  email: string='';
  phone: number = 0;
  subject: string='';
  message: string='';
  send(){
    this.IsSend=true;
  }

}
