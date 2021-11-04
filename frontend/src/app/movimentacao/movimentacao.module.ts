import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao.routing.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { SharedModule } from '../shared/module/nav.module';
import { FormCapModule } from './captacao/captacao/form/form-captacao.module';
import { ReportModule } from '../shared/report/report.module';
import { FormTerminalModule } from './terminal/form/form-terminal.module';
import { GetEmpresaService } from '../empresa/service/get-empresa.service';
import { CidadeService } from '../shared/service/cidade.service';
import { StatusTerminalService } from './terminal/service/status.service';
import { ListaTerminalModule } from './terminal/report/lista-terminal.module';
import { ColumnsModel } from './captacao/captacao/report/lista-monitorada/columns';
import { ListaMonCaptacaoModule } from './captacao/captacao/report/lista-monitorada/lista-cap-mon.module';
import { ListaObsCaptacaoModule } from './captacao/captacao/report/lista-observacao/lista-cap-obs.module';
import { PortoModule } from './porto/porto.module';
import { FormDespachoModule } from './despacho/form/form-despacho.module';
import { ListaMonDespachoModule } from './despacho/report/lista-monitorada/lista-despacho-mon.module';
import { MovSubFormUpModule } from './shared/subform/subform.module';
import { EmailCaptacaoService } from './captacao/captacao/service/email.service';
import { CaptacaoLoteModule } from './captacao/lote/lote.module';
import { RelCaptacaoModule } from './captacao/captacao/rel_captacao/rel-captacao.module';
import { ListaDepotModule } from './depot/report/lista.module';
import { FormDepotModule } from './depot/form/form-depot.module';

@NgModule({
    declarations: [
        MovimentacaoComponent,
    ],
    imports: [
        CommonModule,
        FormCapModule,
        FormDespachoModule,
        FormTerminalModule,
        MovimentacaoRoutingModule,
        ListaTerminalModule,
        SharedModule,
        ReportModule,
        ListaMonDespachoModule,
        ListaMonCaptacaoModule,
        ListaObsCaptacaoModule,
        PortoModule,
        MovSubFormUpModule,
        CaptacaoLoteModule,
        RelCaptacaoModule,
        FormDepotModule,
        ListaDepotModule
        // DialogModule

    ],
    exports: [],
    providers: [
        ColumnsModel,
        GetEmpresaService,
        CidadeService,
        StatusTerminalService,
        EmailCaptacaoService
    ],
})
export class MovimentacaoModule {}
