import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedComponent } from './logged.component';
import { MaterialModule } from '../../module/material.module';

@NgModule({
    declarations: [
        LoggedComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        LoggedComponent
    ],
    providers: [],
})
export class LoggedModule {}
