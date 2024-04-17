import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './component/categories/categories.component';
import { SubCategoryComponent } from './component/sub-category/sub-category.component';
import { AdminOffersListComponent } from './component/admin-offers-list/admin-offers-list.component';
import { AdminProductListComponent } from './component/admin-product-list/admin-product-list.component';

import { CustomersComponent } from './component/customers/customers.component';
import { VendorsComponent } from './component/vendors/vendors.component';
import { SidebarAdminDashComponent } from './component/sidebar-admin-dash/sidebar-admin-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestsComponent} from './component/requests/requests.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path:'categories',component:CategoriesComponent},
      { path:'subcategory',component:SubCategoryComponent},
      { path: 'sidebar' , component:SidebarAdminDashComponent},
      { path:'requests' , component:RequestsComponent},
      { path:'vendors',component:VendorsComponent},
      {path:'customers', component:CustomersComponent},
      {path:'products', component:AdminProductListComponent},
      {path: 'offers', component:AdminOffersListComponent}
    ]
  }]
@NgModule({
  imports: [
  ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ],
  declarations: [
    VendorsComponent,
AdminComponent,
    CustomersComponent,
    SidebarAdminDashComponent,
    AdminProductListComponent,
    AdminOffersListComponent,
    CategoriesComponent,
    SubCategoryComponent,
  ],
  exports: [RouterModule]
})
export class AdminModule { }
