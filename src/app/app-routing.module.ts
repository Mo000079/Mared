import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './register/register.component';
import { VendorGuard } from './Guard/Vendor-guard.guard';
import { AdminGuard } from './Guard/Admin-guard.guard';


const routes: Routes = [
  { path: "", redirectTo: 'user', pathMatch: "full" },
  { path: "login", component : LoginComponent},
  { path: "register", component : RegisterComponent},
  { path: 'user', loadChildren: () => import('./User/Models/user.module').then(m => m.UserModule) },
  { path: 'vendor', loadChildren: () => import('./Vendor/Models/vendor.module').then(m => m.VendorModule)},
  { path: 'admin', loadChildren: () => import('./Admin/Admin.module').then(m => m.AdminModule) },

  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
