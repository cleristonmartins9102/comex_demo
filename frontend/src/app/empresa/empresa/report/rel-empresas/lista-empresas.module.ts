import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/module/material.module';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { RelEmpresasComponent } from './lista-empresas.component';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        RelEmpresasComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReportModule
    ],
    exports: [],
    providers: [
        Menu,
        ColumnsModel
    ],
})
export class RelEmpresasModule {}
