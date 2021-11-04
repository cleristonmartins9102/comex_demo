import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaItemPadraoComponent } from './lista.component';
import { ColumnsModel } from './columns';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';

@NgModule({
    declarations: [
        ListaItemPadraoComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
        DialogOcorrenciaModule,
        BoxMailModule
    ],
    exports: [
        ListaItemPadraoComponent
    ],
    providers: [
        ColumnsModel
    ],
})
export class ListaItemPadraoModule {}
