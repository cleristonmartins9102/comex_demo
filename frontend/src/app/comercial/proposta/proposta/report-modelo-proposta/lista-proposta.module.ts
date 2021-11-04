import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaModeloPropostaComponent } from './lista-proposta.component';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        ListaModeloPropostaComponent,
    ],
    imports: [
        CommonModule,
        ReportModule,
    ],
    exports: [],
    providers: [
        ColumnsModel
    ],
})
export class ListaModeloPropostaModule {}
