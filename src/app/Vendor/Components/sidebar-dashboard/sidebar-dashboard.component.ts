import { Component, Input,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css']
})
export class SidebarDashboardComponent implements OnChanges {
  @Input() isCollapse?: boolean;
constructor(private auth:AuthService , private toastr:ToastrService , private router:Router){

}
  ngOnChanges() {
    console.log('object');
    console.log(this.isCollapse);
  }
logout(){
 
  this.auth.SignOut().subscribe({
    next:data=>{
      if(data.success)
      {
        localStorage.removeItem('token');
        localStorage.removeItem('pic');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('phoneNo');
        localStorage.removeItem('email');
        localStorage.setItem("popop78115###","0")
        localStorage.setItem("wishlist###","0")
        // this.auth.isLogined=false;
       this.auth.objective.next(false)
       
        this.router.navigate(["/user"])
      }
     
    }
  });
}

}
