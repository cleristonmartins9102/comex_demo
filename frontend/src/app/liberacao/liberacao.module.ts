import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiberacaoRoutingModule } from './liberacao.routing.module';
import { FormLiberacaoModule } from './liberacao/form/form-liberacao.module';
import { ReportLiberacaoModule } from './liberacao/report/lista-liberacao.module';
import { LiberacaoComponent } from './liberacao.component';
import { SharedModule } from '../shared/module/nav.module';
import { ReportModule } from '../shared/report/report.module';
import { EmailLiberacaoService } from './liberacao/service/email.service';
import { RelLiberacaoModule } from './liberacao/rel_liberacao/rel-liberacao.module';

@NgModule({
    declarations: [
        LiberacaoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReportModule,
        FormLiberacaoModule,
        ReportLiberacaoModule,
        LiberacaoRoutingModule,
        RelLiberacaoModule
    ],
    exports: [],
    providers: [
        EmailLiberacaoService
    ],
})
export class LiberacaoModule {}
