import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE} from '@angular/material';

import { SharedModule } from '../shared/module/nav.module';
import { ComercialRoutingModule } from './comercial.routing.module';
import { PropostaComponent } from './proposta/proposta.component';
import { FormValuesCompleteService } from './service/form-values-complete.service';
import { ColumnsModel } from './proposta/proposta/report-propostas/columns';
import { PropostaModule } from './proposta/proposta.module';
import { VendedorComponent } from './vendedor/vendedor.component';
import { VendedorModule } from './vendedor/vendedor.module';
import { ComercialComponent } from './comercial.component';
import { ServicoModule } from './servico/servico.module';
import { LoaderModule } from '../shared/loader/loader.module';
import { ComissionarioModule } from './comissionario/comissionario.module';

@NgModule({
    declarations: [
        ComercialComponent,
        PropostaComponent,
        VendedorComponent,
    ],
    imports: [
        CommonModule,
        PropostaModule,
        VendedorModule,
        ComissionarioModule,
        ServicoModule,
        SharedModule,
        ComercialRoutingModule,
        LoaderModule,
    ],
    exports: [],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        FormValuesCompleteService,
        ColumnsModel
    ],
})
export class ComercialModule {}
