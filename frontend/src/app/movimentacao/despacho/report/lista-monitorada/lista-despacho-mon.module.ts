import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnsModel } from './columns';
import { ReportModule } from 'src/app/shared/report/report.module';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { ListaMonDespachoComponent } from './lista-despacho-mon.component';
import { BackEndFormLiberacao } from 'src/app/liberacao/liberacao/service/back-end.service';
import { Menu } from './menu-permission';

@NgModule({
    declarations: [
        ListaMonDespachoComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
        DialogOcorrenciaModule,
        BoxMailModule,
    ],
    exports: [],
    providers: [
        ColumnsModel,
        BackEndFormLiberacao,
    ],
})
export class ListaMonDespachoModule {}
