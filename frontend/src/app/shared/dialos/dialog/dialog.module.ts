import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../module/material.module';
import { DialogComponent } from './dialog.component';

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    entryComponents: [
        DialogComponent
    ],
    exports: [
        DialogComponent
    ],
    providers: [],
})
export class DialogModule {}
