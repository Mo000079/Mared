import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from 'src/app/Services/Subscription/subscription.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-member-ship',
  templateUrl: './member-ship.component.html',
  styleUrls: ['./member-ship.component.css']
})
export class MemberShipComponent{
Subscription:any;
constructor(private SubSrv:SubscriptionService ,private tostar:ToastrService)
{
  this.SubSrv.Getone().subscribe(
    {
      next:data=>
      {
        this.Subscription =data.data
        console.log("subbbbbbbbbbbbbbb",this.Subscription);
        
      }
    })
}
AddNewSubscription(id:number)
{
  console.log(id);
  
  this.SubSrv.AddNewSubscription(id).subscribe(
    {
      next:data=>
      {
        if(data.success)
        {
          this.tostar.success("Your Request Send To Admin")
        }
      }
    }
  )
}
}
