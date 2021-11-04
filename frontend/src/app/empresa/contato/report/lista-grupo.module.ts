import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { ListaGruposComponent } from './lista-grupo.component';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        ListaGruposComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
    ],
    exports: [
        ListaGruposComponent
    ],
    providers: [
        ColumnsModel
    ],
})
export class ListaGrupoModule {}
