import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFaturaComponent } from './espelho.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { FormEspArmModule } from '../espelhos/armazenagem/form-fatura.module';
import { FormEspNotDebTrcModule } from '../espelhos/nota-debito-trc/form-fatura.module';
import { FormEspNotDebAgeModule } from '../espelhos/nota-agenciamento/form-fatura.module';
import { FormEspExpModule } from '../espelhos/exportacao/form-fatura.module';

@NgModule({
    declarations: [
        FormFaturaComponent
    ],
    imports: [
        CommonModule,
        FormEspArmModule,
        FormEspExpModule,
        FormEspNotDebTrcModule,
        FormEspNotDebAgeModule,
        MaterialModule,
        FormModule
    ],
exports: [],
    providers: [],
})
export class EspelhoModule {}
