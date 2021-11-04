import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubformLibUpComponent } from './subform.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { SelectComponent } from './select/select.component';
import { UploadSharedModule } from 'src/app/shared/upload/upload.module';
import { FormModule } from 'src/app/shared/module/form.module';

@NgModule({
    declarations: [
        SubformLibUpComponent,
        SelectComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        UploadSharedModule
    ],
    exports: [
        SubformLibUpComponent
    ],
    providers: [],
})
export class LibSubFormUpModule {}
