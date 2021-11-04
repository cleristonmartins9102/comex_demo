import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacoteComponent } from './lista-pacote.component';
import { ColumnsModel } from './columns';
import { ReportModule } from 'src/app/shared/report/report.module';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';

@NgModule({
    declarations: [
        ListaPacoteComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
        DialogOcorrenciaModule,
        BoxMailModule
    ],
    exports: [],
    providers: [
        ColumnsModel
    ],
})
export class ReportCaptacaoModule {}
