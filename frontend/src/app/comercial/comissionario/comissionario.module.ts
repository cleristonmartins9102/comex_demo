import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from 'src/app/shared/module/form.module';
import { ComissionarioComponent } from './comissionario.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormComissionarioComponent } from './form/form.component';
import { ComissionarioService } from './service/backend.service';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { ListaComissionarioModule } from './report/lista-comissionario.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { RelComissionarioModule } from './rel_comissionarios/lista-comissionario.module';
import { RelComissoesModule } from './rel_comissioes/rel-comissoes.module';

@NgModule({
    declarations: [
        ComissionarioComponent,
        FormComissionarioComponent
    ],
    imports: [
        CommonModule,
        ListaComissionarioModule,
        MaterialModule,
        FormModule,
        CurrencyMaskModule,
        PoliceModule,
        RelComissionarioModule,
        RelComissoesModule
    ],
    exports: [],
    providers: [
        ComissionarioService,
        
    ],
})
export class ComissionarioModule {}
