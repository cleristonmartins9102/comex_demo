import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComercialComponent } from './comercial.component';
import { FormPropostaComponent } from './proposta/proposta/form/form-proposta.component';
import { ListaPropostaComponent } from './proposta/proposta/report-propostas/lista-proposta.component';
import { FormVendedorComponent } from './vendedor/vendedor/form/form-vendedor/form-vendedor.component';
import { ListaVendedorComponent } from './vendedor/vendedor/report/lista-vendedor.component';
import { FormServicoComponent } from './servico/servico/form-servico/form-servico.component';
import { ListaServicoComponent } from './servico/servico/report-servico/lista-servico.component';
import { ListaModeloPropostaComponent } from './proposta/proposta/report-modelo-proposta/lista-proposta.component';
import { FormPacoteComponent } from './servico/pacote/form-pacote/form-pacote.component';
import { ListaPacoteComponent } from './servico/pacote/report-pacote/lista-pacote.component';
import { ListaPredicadoComponent } from './servico/predicado/report-predicado/lista-predicado.component';
import { FormPredicadoComponent } from './servico/predicado/form/form-predicado.component';
import { AuthGuard } from '../login/guards/auth.guard';
import { FormComissionarioComponent } from './comissionario/form/form.component';
import { ListaComissionarioComponent } from './comissionario/report/lista-comisionario.component';
import { ItemPadraoFormComponent } from './servico/servico-padrao/form/form.component';
import { ListaItemPadraoComponent } from './servico/servico-padrao/report/lista.component';
import { RelComissionarioComponent } from './comissionario/rel_comissionarios/lista-comissionario.component';
import { RelPropostaComponent } from './proposta/proposta/rel-propostas-geral/rel-proposta.component';
import { RelVendedorComponent } from './vendedor/vendedor/rel_vendedores/rel-vendedor.component';
import { RelComissoesComponent } from './comissionario/rel_comissioes/rel-comissoes.component';


const ComercialRoute = [
    { path: 'comercial', component: ComercialComponent, canActivate: [AuthGuard] },
    { path: 'comercial/proposta', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormPropostaComponent, canActivate: [AuthGuard]},
            { path: 'editar/:id', component: FormPropostaComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormPropostaComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaPropostaComponent, canActivate: [AuthGuard]},
            { path: 'lista-modelo-proposta', component: ListaModeloPropostaComponent, canActivate: [AuthGuard]},
            { path: 'rel_propostas', component: RelPropostaComponent, canActivate: [AuthGuard]},
        ]
    },
    { path: 'comercial/vendedor', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormVendedorComponent, canActivate: [AuthGuard]},
            { path: 'editar/:id', component: FormVendedorComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormVendedorComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaVendedorComponent, canActivate: [AuthGuard]},
            { path: 'rel_vendedores', component: RelVendedorComponent, canActivate: [AuthGuard]},
        ]
    },
    { path: 'comercial/comissionario', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormComissionarioComponent, canActivate: [AuthGuard]},
            { path: 'editar/:id', component: FormComissionarioComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormComissionarioComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaComissionarioComponent, canActivate: [AuthGuard]},
            { path: 'rel_comissionario', component: RelComissionarioComponent, canActivate: [AuthGuard] },
            { path: 'rel_comissoes', component: RelComissoesComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'comercial/servico', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormServicoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormServicoComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormServicoComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaServicoComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'comercial/servico/pacote', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormPacoteComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormPacoteComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormPacoteComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaPacoteComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'comercial/servico/itempadrao', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: ItemPadraoFormComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormPacoteComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaItemPadraoComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'comercial/servico/predicado', component: ComercialComponent, canActivate: [AuthGuard],
        children: [
            { path: 'editar/:id', component: FormPredicadoComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormPredicadoComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaPredicadoComponent, canActivate: [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(ComercialRoute) ],
    exports: [ RouterModule ],
})

export class ComercialRoutingModule {}
