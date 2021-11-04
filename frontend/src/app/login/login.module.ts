import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../shared/module/material.module';
import { FormModule } from '../shared/module/form.module';
import { AuthService } from './service/auth.service';
import { LoginRoutingModule } from './login.route';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        LoginRoutingModule,
        HttpClientModule,
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true,
        // },
        AuthService
    ],
})
export class LoginModule { }
