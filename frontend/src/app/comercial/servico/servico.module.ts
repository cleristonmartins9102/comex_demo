import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormServicoComponent } from './servico/form-servico/form-servico.component';
import { MaterialModule } from '../../shared/module/material.module';
import { FormModule } from '../../shared/module/form.module';
import { CheckPredicadoService } from './service/check-predicado.service';
import { CheckServicoService } from './service/check-servico.service';
import { GetServicos } from './service/get-servicos.service';
import { PacoteModule } from './pacote/pacote.module';
import { ReportPredicadoModule } from './predicado/report-predicado/lista-predicado.module';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { ReportServicoModule } from './servico/report-servico/lista-servico.module';
import { PredicadoModule } from './predicado/form/form-predicado.module';
import { ItemPadraoModule } from './servico-padrao/servico-padrao.module';
import { PoliceModule } from 'src/app/shared/module/police-module';

@NgModule({
    declarations: [
        FormServicoComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        PoliceModule,
        ReportServicoModule,
        PacoteModule,
        ReportPredicadoModule,
        DialogModule,
        PredicadoModule,
        ItemPadraoModule
    ],
    exports: [],
    providers: [
        CheckPredicadoService,
        CheckServicoService,
        GetServicos,
    ],
})
export class ServicoModule {}
