import { NgModule } from '@angular/core';

import { NgxChartsModule} from '@swimlane/ngx-charts'
import { CommonModule } from "@angular/common";
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { OrderListComponent } from '../Components/order-list/order-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from '../Components/vendor/vendor.component';

import { AddProductComponent } from '../Components/add-product/add-product.component';
import { DashboardNavbarComponent } from '../Components/dashboard-navbar/dashboard-navbar.component';
import { OfferComponent } from '../Components/offer/offer.component';
import { OrderDetailsComponent } from '../Components/order-details/order-details.component';



import { LineChartComponent } from '../Components/line-chart/line-chart.component';
import { SidebarDashboardComponent } from '../Components/sidebar-dashboard/sidebar-dashboard.component';
import { OfferDetailsComponent } from '../Components/offer-details/offer-details-component/offer-details.component';
import { VendorOffersListComponent } from '../Components/vendor-offers-list/vendor-offers-list-component/vendor-offers-list.component';
import { ProfileSettingComponent } from '../Components/profile-setting/profile-setting.component';
import { MemberShipComponent } from '../Components/member-ship/member-ship.component';
// import { InfoComponent } from '../Components/info/info.component';
import { ChangePasswordComponent } from '../Components/change-password/change-password.component';
import { VendorProductDetailsComponent} from '../Components/vendor-product-details/vendor-product-details.component';
import { VendorReviewComponent } from '../Components/vendor-review/vendor-review.component';
import { PieChartComponent } from './../Components/pie-chart/pie-chart.component'
import { SearchProductComponent } from '../Components/search-product/search-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorProductListComponent } from '../Components/vendor-product-list/vendor-product-list.component';
import { InfoComponent } from '../Components/info/info.component';
import { ShopInfoComponent } from '../Components/shop-info/shop-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VEmptyComponent } from '../Components/V-Empty/V-Empty.component';
import { PendingComponent } from '../Components/pending/pending.component'


const routes:Routes = [

  {path:'',component:VendorComponent,children:
  [
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    {path:'dashboard',component:DashboardComponent},
    {path:'orderlist',component:OrderListComponent},
    { path:'orderlist/:id',component:OrderDetailsComponent},
    {path:'productlist',component:VendorProductListComponent},
    {path:'addproduct' ,component:AddProductComponent},
    // {path:'editproduct/:id' ,component:AddProductComponent},
    { path:'offers' ,component:VendorOffersListComponent},
    {path:'addoffer' ,component:OfferComponent},
    {path:'editoffer/:id' ,component:OfferComponent},
      { path: 'vendor-review', component: VendorReviewComponent },
      {path:'pending' , component:PendingComponent},



    {path:"profile-setting",component:ProfileSettingComponent,children:[
      {path:"", redirectTo:'info',pathMatch:"full"},
      {path:"change-password", component:ChangePasswordComponent},
      {path:"membership" , component:MemberShipComponent},
      {path:"info" , component:InfoComponent},
      { path:"shop-info" , component:ShopInfoComponent}
    ]},
    {path:'offerdetails/:id',component:OfferDetailsComponent},
    {path:'productdetails/:id',component:VendorProductDetailsComponent},
    {path:'updateProduct/:id',component:AddProductComponent}
    // {path:'reviews' ,component:},
    // {path:'profile',component:},
    // {path:'membership',component:},
  ]},



  ]


@NgModule({
  declarations: [
    SearchProductComponent,
    LineChartComponent,
    AddProductComponent,
    DashboardComponent,
    DashboardNavbarComponent,
    OfferComponent,
    OrderDetailsComponent,
    OrderListComponent,
    SidebarDashboardComponent,
    VendorComponent,
    VendorProductListComponent,
    VendorOffersListComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    MemberShipComponent,
    InfoComponent,
    VendorProductDetailsComponent,
    PieChartComponent,
    OfferDetailsComponent,
    VendorReviewComponent,
    ShopInfoComponent,
    VEmptyComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ],
  exports: [RouterModule]
})
export class VendorModule { }
