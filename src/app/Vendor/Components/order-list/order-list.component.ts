import { Component, OnInit } from '@angular/core';
import { OrderListServiceService } from '../../Services/order-list-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../Services/Order/order.service';
import { IOrder, PaymentStatus } from 'src/app/Share/IOrder';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  OrderLists!: IOrder[];
  OrderStatus: string = "Status";
  orderId!: number;
  PageSize:number =5;
  PageIndex:number =1;
  Count:number =5;
  constructor(
              private _OrderService:OrderService,
    private router: Router,
              private _ActivatedRoute:ActivatedRoute,
              private tostar:ToastrService) {

  }
  ngOnInit(): void {
    this.getAll();
    // Implementation for ngOnInit
  }
  ChangePage(event:any)
  {
    this.PageIndex =event;
    this.getAll();
  }
  Status(s: any) {
    let status = s.target.value;
    if (status == "Status") return this.getAll();
    this._OrderService.filterForVndr(status).subscribe((res => {
      console.log(status, res.data);
      this.OrderLists = res.data.data;
    }))
  }
  Details(OrderId:number){
    this.router.navigate(['vendor/orderlist',OrderId])
  }

  getAll() {
    this._OrderService.GetAllOrdersForVndr(this.PageSize,this.PageIndex).subscribe(res => {

      this.OrderLists = res.data.data;
      this.PageIndex =res.data.pageIndex;
      this.PageSize = res.data.pageSize;
      this.Count  = res.data.count
      console.log("order lists", this.OrderLists);
      this.OrderLists = this.OrderLists.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })
  }
  CanceledOrder(id:number)
  {
    this._OrderService.ChangePaymentStatus(id,PaymentStatus.Canceled).subscribe({
      next:res=>{
        console.log(res.data);
       if(res.success)
       {
        this.tostar.success(res.message)
        this.getAll()
       }
       else
       {
        this.tostar.error(res.message)
       }
      },
      error:error=>
      {
       console.log(error);

      }
    })

  }
  CompletedOrder(id:number)
  {
    this._OrderService.ChangePaymentStatus(id,PaymentStatus.Completed).subscribe({
      next:res=>{
        console.log(res.data);
       if(res.success)
       {
        this.tostar.success(res.message)
        this.getAll()
       }
       else
       {
        this.tostar.error(res.message)
       }
      },
      error:error=>
      {
       console.log(error);

      }
    })
  }
}
