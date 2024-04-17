import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin-service';
import { IUserMemberRquest } from 'src/app/Share/IUserMemberRquest';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {

  Requests!: IUserMemberRquest[];
  constructor(private adminServ: AdminService) {
   this.get()
  }
  get()
  {
    this.adminServ.GetMemberRequests().subscribe({
      next: data => {
        if (data.success) {
          this.Requests = data.data
          console.log(this.Requests, "rrrrrrrrrrrrrrrrrrrrrrrrrr");

        }
      }
    })
  }
  approve(id: string) {
    this.adminServ.ApproveSubscription(id).subscribe({
      next:data=>{
        if(data.success)
        {
          console.log(data.data);
          // this.Requests.splice()
          this.get()
        }
      }
    })
  }
  cancel(id: string) {
    this.adminServ.CancelSubscription(id).subscribe({
      next:data=>{
        if(data.success)
        {
          console.log(data.data);
          this.get()
        }
      }
    })
  }
}
