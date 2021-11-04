import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFaturaArmComponent } from './print-fatura.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HeaderComponent } from '../header/header.component';
import { HeaderFaturaModule } from '../header-fatura.module';

@NgModule({
    declarations: [
        PrintFaturaArmComponent,
    ],
    imports: [
        CommonModule,
        CurrencyMaskModule,
        HeaderFaturaModule
    ],
    exports: [
        PrintFaturaArmComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'pt-BR'}
    ],
})
export class PrintFaturaArmModule {}
