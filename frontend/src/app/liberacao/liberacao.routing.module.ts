import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormLiberacaoComponent } from './liberacao/form/form.component';
import { ListaLiberacaoComponent } from './liberacao/report/lista-liberacao.component';
import { LiberacaoComponent } from './liberacao.component';
import { AuthGuard } from '../login/guards/auth.guard';
import { RelLiberacaoComponent } from './liberacao/rel_liberacao/rel-liberacao.component';

const routes: Routes = [
    { path: 'liberacao/liberacao', component: LiberacaoComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cadastro', component: FormLiberacaoComponent, canActivate: [AuthGuard] },
            { path: 'editar/:id', component: FormLiberacaoComponent, canActivate: [AuthGuard] },
            { path: 'view/:id', component: FormLiberacaoComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListaLiberacaoComponent, canActivate: [AuthGuard] },
            { path: 'rel_liberacao', component: RelLiberacaoComponent, canActivate: [AuthGuard] },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LiberacaoRoutingModule {}
