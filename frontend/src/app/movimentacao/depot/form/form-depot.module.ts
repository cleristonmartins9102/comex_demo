import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { FormDepotComponent } from './form.component';
import { DepotBackEndService } from '../service/backend.service';
import { StatusDepotService } from '../service/status.service';

@NgModule({
    declarations: [
        FormDepotComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        DialogModule
    ],
    exports: [],
    providers: [
        ColumnContainer,
        ColumnDocumentos,
        GetEmpresaService,
        DepotBackEndService,
        StatusDepotService
    ],
})
export class FormDepotModule {}
