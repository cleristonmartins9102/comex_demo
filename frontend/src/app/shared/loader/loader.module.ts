import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from 'src/app/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        LoaderComponent
    ],
    providers: [
    ],
})
export class LoaderModule {}
