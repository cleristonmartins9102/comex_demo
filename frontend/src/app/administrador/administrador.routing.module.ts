import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorComponent } from './administrador.component';
import { FormGrupoComponent } from './grupo/form/form.component';
import { AuthGuard } from '../login/guards/auth.guard';



const EmpresaRoute = [
    { path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard],
        children: [
            // { path: 'empresa/lista', component: ListaEmpresasComponent},
            { path: 'grupo/cadastro', component: FormGrupoComponent, canActivate: [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(EmpresaRoute) ],
    exports: [ RouterModule ],
})

export class AdministradorRoutingModule {}
