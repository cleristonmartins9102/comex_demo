import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProcessoComponent } from './lista-processo.component';
import { ColumnsModel } from './columns';
import { ReportModule } from 'src/app/shared/report/report.module';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { Menu } from './menu-permission';

@NgModule({
    declarations: [
        ListaProcessoComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
        DialogOcorrenciaModule,
        BoxMailModule
    ],
    exports: [],
    providers: [
        ColumnsModel,
    ],
})
export class ReportProcessoModule {}
