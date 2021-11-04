import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RelPropostaComponent } from './rel-proposta.component';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        RelPropostaComponent,
    ],
    imports: [
        CommonModule,
        ReportModule,
    ],
    exports: [],
    providers: [
        ColumnsModel,
        Menu
    ],
})
export class RelPropostaModule {}
