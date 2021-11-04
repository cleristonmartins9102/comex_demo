import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProcessoComponent } from './form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
// import { FormDropdownService } from '../service/form-dropdown.service';
import { SubFormLiberacaoModule } from './sub-form/sub-form.module';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

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
        FormProcessoComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        BoxMailModule,
        PoliceModule,
        CurrencyMaskModule,
        SubFormLiberacaoModule
    ],
    exports: [],
    providers: [
        
        // FormDropdownService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },

        // {
        //     provide: DateAdapter, useClass: AppDateAdapter
        // },
        // {
        //     provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        // }
    ],
})
export class FormProcessoModule {}
