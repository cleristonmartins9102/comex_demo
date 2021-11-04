import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPacoteComponent } from './form-pacote/form-pacote.component';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { ReportModule } from 'src/app/shared/report/report.module';
import { ColumnsModel } from './report-pacote/columns';
import { Menu } from './report-pacote/menu-permission';
import { ReportCaptacaoModule } from './report-pacote/lista-pacote.module';
import { PacoteFormModule } from './form-pacote/form-pacote.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReportCaptacaoModule,
        FormModule,
        MaterialModule,
        ReportModule,
        PacoteFormModule,
    ],
    exports: [
        FormPacoteComponent
    ],
    providers: [
        ColumnsModel,
    ],
})
export class PacoteModule {}
