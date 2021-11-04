import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { UploadSharedModule } from 'src/app/shared/upload/upload.module';

@NgModule({
    declarations: [
        SelectComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        UploadSharedModule
    ],
    exports: [
        SelectComponent
    ],
    providers: [
        TipoDocumentoService
    ],
})
export class SelectModule {}
