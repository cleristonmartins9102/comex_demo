import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaEmpresasComponent } from './lista-empresas.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';

@NgModule({
    declarations: [
        ListaEmpresasComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReportModule
    ],
    exports: [],
    providers: [
    ],
})
export class ListaEmpresasModule {}
