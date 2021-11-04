import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormProcessoComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemModule } from './item/item.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config'
import { CurrencyMaskModule } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [
        SubFormProcessoComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        ItemModule,
        CurrencyMaskModule
    ],
    exports: [
        SubFormProcessoComponent
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ]

})
export class SubFormLiberacaoModule {}
