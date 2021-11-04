import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador.routing.module';
import { SharedModule } from '../shared/module/nav.module';
import { FormGrupoModule } from './grupo/form/form.module';

@NgModule({
    declarations: [
        AdministradorComponent
    ],
    imports: [
        CommonModule,
        FormGrupoModule,
        AdministradorRoutingModule,
        SharedModule,
    ],
    exports: [
        AdministradorComponent
    ],
    providers: [],
})
export class AdministradorModule {}
