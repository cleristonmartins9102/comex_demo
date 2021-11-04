import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyEspelhoFaturaComponent } from './body.component';
import { PrintFaturaAgeModule } from '../agenciamento/print-fatura.module';
import { PrintFaturaArmModule } from '../armazenagem/print-fatura.module';
import { PrintFaturaTrcModule } from '../debito-transporte/print-fatura.module';
import { PrintFaturaExpModule } from '../exportacao/print-fatura.module';

@NgModule({
    declarations: [
        BodyEspelhoFaturaComponent
    ],
    imports: [
        CommonModule,
        PrintFaturaArmModule,
        PrintFaturaAgeModule,
        PrintFaturaTrcModule,
        PrintFaturaExpModule
    ],
    exports: [
        BodyEspelhoFaturaComponent
    ],
    providers: [],
})
export class BodyEspelhoFaturaModule {}
