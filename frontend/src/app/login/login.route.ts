import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

const EmpresaRoute = [
    { path: 'login', component: LoginComponent,
        // children: [
            // { path: 'empresa/lista', component: ListaEmpresasComponent},
            // { path: 'empresa/cadastro', component: FormEmpresaComponent},
            // { path: 'empresa/cadastro', component: PessoaComponent},
            // { path: 'empresa/editar/:id', component: PessoaComponent}
        // ]

    },
];

@NgModule({
    imports: [ RouterModule.forChild(EmpresaRoute) ],
    exports: [ RouterModule ],
})

export class LoginRoutingModule {}
