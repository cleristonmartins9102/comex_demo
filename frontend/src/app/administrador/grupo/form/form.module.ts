import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGrupoComponent } from './form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { GrupoAcessoComponent } from './item/grupo-acesso/grupo-acesso.component';
import { GrupoAcessoMembrosComponent } from './item/grupo-acesso-membros/grupo-acesso-membros.component';
import { SubFormGruAceModule } from './sub-form/sub-form.module';

@NgModule({
    declarations: [
        FormGrupoComponent,
        GrupoAcessoComponent,
        GrupoAcessoMembrosComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SubFormGruAceModule
    ],
    exports: [
        FormGrupoComponent
    ],
    providers: [],
})
export class FormGrupoModule {}
