import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { RelGruposContatoComponent } from './lista-grupo.component';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        RelGruposContatoComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
    ],
    exports: [
        RelGruposContatoComponent
    ],
    providers: [
        ColumnsModel
    ],
})
export class RelGrupoContatoModule {}
