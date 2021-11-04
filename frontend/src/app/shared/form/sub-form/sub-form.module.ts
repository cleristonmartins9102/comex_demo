import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormComponent } from './sub-form.component';
import { UploadSharedModule } from '../../upload/upload.module';
import { MaterialModule } from '../../module/material.module';
import { FormModule } from '../../module/form.module';

@NgModule({
    declarations: [
        SubFormComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        UploadSharedModule,
     ],
    exports: [
        SubFormComponent
    ],
    providers: [],
})
export class SubFormModule {}
