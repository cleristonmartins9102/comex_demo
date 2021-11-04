import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovimentacaoComponent } from './movimentacao.component';
import { FormCaptacaoComponent } from './captacao/captacao/form/form.component';
import { FormTerminalComponent } from './terminal/form/form.component';
import { ListaTerminalComponent } from './terminal/report/lista-terminal.component';
import { ListaMonCaptacaoComponent } from './captacao/captacao/report/lista-monitorada/lista-cap-mon.component';
import { ListaObsCaptacaoComponent } from './captacao/captacao/report/lista-observacao/lista-cap-obs.component';
import { FormPortoComponent } from './porto/form/form.component';
import { FormDespachoComponent } from './despacho/form/form.component';
import { ListaMonDespachoComponent } from './despacho/report/lista-monitorada/lista-despacho-mon.component';
import { AuthGuard } from '../login/guards/auth.guard';
import { CaptacaoLoteComponent } from './captacao/lote/lote.component';
import { ListaCaptacaoLoteComponent } from './captacao/lote/report/lista.component';
import { FormCapLoteComponent } from './captacao/lote/for/form.component';
import { RelCaptacaoComponent } from './captacao/captacao/rel_captacao/rel-captacao.component';
import { FormDepotComponent } from './depot/form/form.component';
import { ListaDepotComponent } from './depot/report/lista.component';

const routes: Routes = [
    { path: 'movimentacao', component: MovimentacaoComponent, canActivate: [AuthGuard]},

    { path: 'movimentacao/captacao', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormCaptacaoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormCaptacaoComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormCaptacaoComponent, canActivate: [AuthGuard]},
            { path: 'lista-mon', component: ListaMonCaptacaoComponent, canActivate: [AuthGuard] },
            { path: 'lista-obs', component: ListaObsCaptacaoComponent, canActivate: [AuthGuard] },
            { path: 'rel_captacao', component: RelCaptacaoComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'movimentacao/captacaolote', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormCapLoteComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormCapLoteComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormCapLoteComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaCaptacaoLoteComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'movimentacao/terminal', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormTerminalComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormTerminalComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormTerminalComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaTerminalComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'movimentacao/depot', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormDepotComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormDepotComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormDepotComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaDepotComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'movimentacao/despacho', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormDespachoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormDespachoComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormDespachoComponent, canActivate: [AuthGuard]},
            { path: 'lista-mon', component: ListaMonDespachoComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'movimentacao/porto', component: MovimentacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormPortoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormTerminalComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaTerminalComponent, canActivate: [AuthGuard] }
        ]
    },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovimentacaoRoutingModule {}
