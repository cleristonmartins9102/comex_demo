import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCaptacaoComponent } from './form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { TerminalBackEndService } from '../../../terminal/service/backend.service';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { ContainerService } from '../../../container/service/container.service';
// import { UploadMovModule } from '../../upload/upload.module';
import { MovSubFormUpModule } from '../../../shared/subform/subform.module';
import { ColumnBreakBulk } from './sub-form-column/break-bulk';
import { SubformBreakBulkComponent } from './subform-break-bulk/subform-break-bulk.component';
import { PoliceModule } from 'src/app/shared/module/police-module';

@NgModule({
    declarations: [
        FormCaptacaoComponent,
        SubformBreakBulkComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        PoliceModule,
        MaterialModule,
        SubFormModule,
        BoxMailModule,
        MovSubFormUpModule,
    ],
    exports: [],
    providers: [
        ContainerService,
        ColumnContainer,
        ColumnDocumentos,
        ColumnBreakBulk,
        GetEmpresaService,
        BackendService,
        TerminalBackEndService,

    ],
})
export class FormCapModule {}
