import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormModule } from '../../shared/module/form.module';
import { MaterialModule } from '../../shared/module/material.module';
import { PoliceModule } from '../../shared/module/police-module';
import { FormPropostaModule } from './proposta/form/form-proposta.module';
import { Menu } from './proposta/report-propostas/menu-permission';
import { ListaPropostaModule } from './proposta/report-propostas/lista-proposta.module';
import { GetServicos } from '../servico/service/get-servicos.service';
import { ListaModeloPropostaModule } from './proposta/report-modelo-proposta/lista-proposta.module';
import { RelPropostaModule } from './proposta/rel-propostas-geral/rel-proposta.module';
import { RegiaoModule } from 'src/app/shared/regiao/regiao.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PoliceModule,
        FormModule,
        MaterialModule,
        FormPropostaModule,
        ListaPropostaModule,
        ListaModeloPropostaModule,
        RelPropostaModule,
        RegiaoModule
    ],
    exports: [
    ],
    providers: [
        GetServicos
    ],
})
export class PropostaModule {}
