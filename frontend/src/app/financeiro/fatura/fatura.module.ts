import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFaturaComponent } from './report/faturas_simples/lista-fatura.component';
import { EspelhoModule } from './form/espelho/espelho.module';
import { ReportFaturaModule } from './report/faturas_simples/lista-fatura.module';
import { ReportFaturaTotalModule } from './report/faturas_total/lista-fatura.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { RelFaturaModule } from './report/rel_faturas_total/lista-fatura.module';
import { RelFaturaSimplesModule } from './report/rel_faturas_simples/lista-fatura.module';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        EspelhoModule,
        ReportFaturaTotalModule,
        ReportFaturaModule,
        RelFaturaModule,
        RelFaturaSimplesModule
    ],
    exports: [
    ],
    providers: [
    ],
})
export class FaturaModule {}
