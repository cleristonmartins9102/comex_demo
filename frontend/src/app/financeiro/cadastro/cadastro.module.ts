import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormImpostoComponent } from './imposto/form/form.component';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { ListaImpostoComponent } from './imposto/report/lista-imposto.component';
import { ReportModule } from 'src/app/shared/report/report.module';
import { ListaImpostoModule } from './imposto/report/lista-imposto.module';
import { FormImpostoModule } from './imposto/form/form.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormImpostoModule,
        ListaImpostoModule,
        MaterialModule
    ],
    exports: [
    ],
    providers: [],
})
export class FinanceiroCadastroModule {}
