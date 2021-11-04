import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap, delay } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { AuthService } from './login/service/auth.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(
        public loaderService: LoaderService,
        private authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        req = req.clone({
            setHeaders: {
                // 'Content-Type' : 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.authService.getToken()}`,
            },
        });
        return next.handle(req).pipe(delay(250),
        tap((event: HttpEvent<any>) => {
            // if the event is for http response
            if (event instanceof HttpResponse) {
                this.loaderService.hide();
            }
        }, (err: any) => {
            // if any error we stop our loader
            // finalize(() => this.loaderService.hide());
            this.loaderService.hide();
        }));
    }
}