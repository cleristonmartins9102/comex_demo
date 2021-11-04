import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLiberacaoComponent } from './form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { FormDropdownService } from '../service/form-dropdown.service';
import { SubFormLiberacaoModule } from './sub-form/sub-form.module';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CustomCurrencyMaskConfig } from 'src/app/comercial/proposta/proposta/form/form-proposta.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
    declarations: [
        FormLiberacaoComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        BoxMailModule,
        PoliceModule,
        SubFormLiberacaoModule,
        CurrencyMaskModule,

    ],
    exports: [],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        FormDropdownService,
        // {
        //     provide: DateAdapter, useClass: AppDateAdapter
        // },
        // {
        //     provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        // }
    ],
})
export class FormLiberacaoModule {}
