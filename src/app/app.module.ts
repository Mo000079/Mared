import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { LoaderComponent } from './loader/loader.component';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { RequestsComponent } from './Admin/component/requests/requests.component';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
      RegisterComponent,
      LoaderComponent,
      RequestsComponent,
    

  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,

    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
