import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { StatusContatoGrupoService } from './service/status.service';
import { FormContatoModule } from './form/form-contato.module';
import { ContatoEmpresaService } from '../service/contato.service';
import { ListaGrupoModule } from './report/lista-grupo.module';
import { RelGrupoContatoModule } from './rel-grupos-contatos/lista-grupo.module';

@NgModule({
    declarations: [
],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        FormContatoModule ,
        ListaGrupoModule,
        RelGrupoContatoModule
    ],
    exports: [],
    providers: [
        StatusContatoGrupoService,
        ContatoEmpresaService
    ],
})
export class ContatoModule {}
