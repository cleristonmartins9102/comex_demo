import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnsModel } from './columns';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { RelVendedorComponent } from './rel-vendedor.component';

@NgModule({
    declarations: [
        RelVendedorComponent
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
        Menu
    ],
})
export class RelVendedorModule {}
