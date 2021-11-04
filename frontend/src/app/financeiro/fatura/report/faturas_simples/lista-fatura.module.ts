import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaFaturaComponent } from './lista-fatura.component';
import { ColumnsModel } from './columns';
import { ReportModule } from 'src/app/shared/report/report.module';
import { DialogOcorrenciaModule } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { Menu } from './menu-permission';
import { EmailFaturaService } from '../../service/email.service';
import { FormModule } from 'src/app/shared/module/form.module';

@NgModule({
    declarations: [
        ListaFaturaComponent
    ],
    imports: [
        CommonModule,
        ReportModule,
        DialogOcorrenciaModule,
        BoxMailModule,
        FormModule
    ],
    exports: [],
    providers: [
        ColumnsModel,
        EmailFaturaService
    ],
})
export class ReportFaturaModule {}
