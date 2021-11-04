import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCapLoteComponent } from './form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
// import { FormDropdownService } from '../service/form-dropdown.service';
import { SubFormLoteModule } from './sub-form/sub-form.module';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { SubFormUploadModule } from 'src/app/financeiro/fatura/form/espelhos/sub-form-upload/sub-form.module';

// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//     align: 'left',
//     allowNegative: true,
//     decimal: ',',
//     precision: 2,
//     prefix: 'R$',
//     suffix: '',
//     thousands: '.'
// };

@NgModule({
    declarations: [
        FormCapLoteComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        BoxMailModule,
        PoliceModule,
        SubFormLoteModule,
        CurrencyMaskModule,
        SubFormUploadModule
    ],
    exports: [
        FormCapLoteComponent
    ],
    providers: [
        // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
})
export class FormCapLoteModule {}
