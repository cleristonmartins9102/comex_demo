import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPropostaComponent } from './lista-proposta.component';
import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';

@NgModule({
    declarations: [
        ListaPropostaComponent,
    ],
    imports: [
        CommonModule,
        ReportModule,
    ],
    exports: [],
    providers: [
    ],
})
export class ListaPropostaModule {}
