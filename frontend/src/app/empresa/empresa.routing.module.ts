import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmpresaComponent } from './empresa.component';
import { FormGrupoContatoComponent } from './contato/form/form.component';
import { ListaGruposComponent } from './contato/report/lista-grupo.component';
import { FormEmpresaComponent } from './empresa/form/form-empresa.component';
import { ListaEmpresasComponent } from './empresa/report/lista-empresas/lista-empresas.component';
import { PessoaComponent } from '../shared/form/pessoa/pessoa.component';
import { AuthGuard } from '../login/guards/auth.guard';
import { RelEmpresasComponent } from './empresa/report/rel-empresas/lista-empresas.component';
import { RelGruposContatoComponent } from './contato/rel-grupos-contatos/lista-grupo.component';

const EmpresaRoute = [
    { path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard],
        children: [
            { path: 'empresa/lista', component: ListaEmpresasComponent, canActivate: [AuthGuard]},
            { path: 'empresa/rel_empresas', component: RelEmpresasComponent, canActivate: [AuthGuard]},
            // { path: 'empresa/cadastro', component: FormEmpresaComponent},
            { path: 'empresa/cadastro', component: PessoaComponent, canActivate: [AuthGuard]},
            { path: 'empresa/editar/:id', component: PessoaComponent, canActivate: [AuthGuard]},
            { path: 'empresa/view/:id', component: PessoaComponent, canActivate: [AuthGuard]}
        ]

    },
    { path: 'empresa/grupodecontato', component: EmpresaComponent, canActivate: [AuthGuard],
        children: [
            { path: 'lista', component: ListaGruposComponent, canActivate: [AuthGuard]},
            { path: 'rel_grupo_de_contato', component: RelGruposContatoComponent, canActivate: [AuthGuard]},
            { path: 'cadastro', component: FormGrupoContatoComponent, canActivate: [AuthGuard]},
            { path: 'editar/:id', component: FormGrupoContatoComponent, canActivate: [AuthGuard]},
            { path: 'view/:id', component: FormGrupoContatoComponent, canActivate: [AuthGuard]}
        ]

    }
];

@NgModule({
    imports: [ RouterModule.forChild(EmpresaRoute) ],
    exports: [ RouterModule ],
})

export class EmpresaRoutingModule {}
