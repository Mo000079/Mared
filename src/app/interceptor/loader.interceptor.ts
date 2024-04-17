import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../Services/loader.service';

@Injectable({
    providedIn:"root"
})
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private Loader:LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Start");
        
        this.Loader.show()
        return next.handle(req).pipe(
            finalize(() => {
                this.Loader.hide()
        console.log("End");

              })
        );
    }
}