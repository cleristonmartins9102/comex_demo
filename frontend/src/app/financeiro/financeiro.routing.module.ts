import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinanceiroComponent } from './financeiro.component';
import { ListaOperacaoComponent } from './operacao/report/lista-operacao.component';
import { ListaProcessoComponent } from './processo/report/lista-processo.component';
import { FormProcessoComponent } from './processo/form/form.component';
import { FormFaturaComponent } from './fatura/form/espelho/espelho.component';
import { AuthGuard } from '../login/guards/auth.guard';
import { ListaFaturaComponent } from './fatura/report/faturas_simples/lista-fatura.component';
import { ListaFaturaTotalComponent } from './fatura/report/faturas_total/lista-fatura.component';
import { FormImpostoComponent } from './cadastro/imposto/form/form.component';
import { ListaImpostoComponent } from './cadastro/imposto/report/lista-imposto.component';
import { FormCextComponent } from './cext/form/form.component';
import { ListaCextComponent } from './cext/report/lista-cext.component';
import { ItemPadraoFormComponent } from '../comercial/servico/servico-padrao/form/form.component';
import { ListaItemPadraoComponent } from '../comercial/servico/servico-padrao/report/lista.component';
import { ListaItemPadraoFatComponent } from './item-padrao/report/report.component';
import { RelFaturaComponent } from './fatura/report/rel_faturas_total/lista-fatura.component';
import { RelProcessoComponent } from './processo/rel-processo/lista-processo.component';
import { RelOperacaoComponent } from './operacao/rel-operacao/lista-operacao.component';
import { RelFaturaSimplesComponent } from './fatura/report/rel_faturas_simples/lista-fatura.component';

const routes: Routes = [
    { path: 'financeiro/fatura', component: FinanceiroComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormFaturaComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormFaturaComponent, canActivate: [AuthGuard] },
            { path: 'view/:id', component: FormFaturaComponent, canActivate: [AuthGuard] },
            { path: 'lista', component: ListaFaturaComponent, canActivate: [AuthGuard] },
            { path: 'listafaturatotal', component: ListaFaturaTotalComponent, canActivate: [AuthGuard] },
            { path: 'rel_fatura', component: RelFaturaComponent, canActivate: [AuthGuard] },
            { path: 'rel_fatura_simples', component: RelFaturaSimplesComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'financeiro/processo', component: FinanceiroComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormProcessoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormProcessoComponent, canActivate: [AuthGuard] },
            { path: 'view/:id', component: FormProcessoComponent, canActivate: [AuthGuard] },
            { path: 'lista', component: ListaProcessoComponent, canActivate: [AuthGuard] },
            { path: 'rel_processo', component: RelProcessoComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'financeiro/cadastro', component: FinanceiroComponent, canActivate: [AuthGuard],
        children: [
            { path: 'imposto', component:  FormImpostoComponent,
                children: [
                   { path: 'editar/:id', component: FormImpostoComponent, canActivate: [AuthGuard]},
                   { path: 'view/:id', component: FormImpostoComponent, canActivate: [AuthGuard]},
                ]
            },
            { path: 'listaimpostos', component: ListaImpostoComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'financeiro/operacoes', component: FinanceiroComponent, canActivate: [AuthGuard],
        children: [
            // { path: 'cadastro', component: FormLiberacaoComponent },
            // { path: 'editar/:id', component: FormLiberacaoComponent },
            { path: 'lista', component: ListaOperacaoComponent, canActivate: [AuthGuard] },
            { path: 'rel_operacao', component: RelOperacaoComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'financeiro/itempadrao', component: FinanceiroComponent, canActivate: [AuthGuard],
    children: [
        { path: 'cadastro', component: ItemPadraoFormComponent, canActivate: [AuthGuard] },
        { path: 'editar/:id', component: ItemPadraoFormComponent, canActivate: [AuthGuard]},
        { path: 'lista', component: ListaItemPadraoFatComponent, canActivate: [AuthGuard] },
    ]
},
    { path: 'financeiro/cext', component: FinanceiroComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormCextComponent },
            { path: 'editar/:id', component: FormCextComponent },
            { path: 'view/:id', component: FormCextComponent },
            // { path: 'editar/:id', component: FormLiberacaoComponent },
            { path: 'lista', component: ListaCextComponent, canActivate: [AuthGuard] },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinanceiroRoutingModule {}
