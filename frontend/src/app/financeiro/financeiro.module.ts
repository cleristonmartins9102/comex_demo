import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroComponent } from './financeiro.component';
import { FinanceiroRoutingModule } from './financeiro.routing.module';
import { SharedModule } from '../shared/module/nav.module';
import { ReportModule } from '../shared/report/report.module';
import { FormLiberacaoModule } from '../liberacao/liberacao/form/form-liberacao.module';
import { ReportOperacaoModule } from './operacao/report/lista-operacao.module';
import { ReportProcessoModule } from './processo/report/lista-processo.module';
import { FormProcessoModule } from './processo/form/form-processo.module';
import { FaturaModule } from './fatura/fatura.module';
import { FinanceiroCadastroModule } from './cadastro/cadastro.module';
import { CextModule } from './cext/cext.module';
import { AuthService } from '../login/service/auth.service';
import { ItemPadraoModule } from '../comercial/servico/servico-padrao/servico-padrao.module';
import { ListaItemPadraoFatModule } from './item-padrao/report/report.module';
import { RelProcessoModule } from './processo/rel-processo/lista-processo.module';
import { RelOperacaoModule } from './operacao/rel-operacao/lista-operacao.module';

@NgModule({
    declarations: [
        FinanceiroComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReportModule,
        ReportOperacaoModule,
        ReportProcessoModule,
        FormProcessoModule,
        FinanceiroRoutingModule,
        FinanceiroCadastroModule,
        FaturaModule,
        CextModule,
        ItemPadraoModule,
        ListaItemPadraoFatModule,
        RelProcessoModule,
        RelOperacaoModule
    ],
    exports: [],
    providers: [
    ],
})
export class FinanceiroModule {}
