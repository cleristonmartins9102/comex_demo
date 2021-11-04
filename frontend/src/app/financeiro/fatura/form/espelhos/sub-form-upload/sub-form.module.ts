import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormUploadComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { SelectModule } from './select/select.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';

@NgModule({
    declarations: [
        SubFormUploadComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        SelectModule
    ],
    exports: [
        SubFormUploadComponent
    ],
    providers: [
    ],
})
export class SubFormUploadModule {}
