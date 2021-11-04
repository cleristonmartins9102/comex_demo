import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SubFormComponent } from './sub-form/sub-form.component';
import { UploadModule } from './upload/upload.module';
import { FormPropostaComponent } from './form-proposta.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { SharedModule } from 'src/app/shared/module/nav.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { ContatoEmpresaService } from 'src/app/empresa/service/contato.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { SubFormItemPropostaModule } from './sub-form/sub-form.module';
import { RegiaoModule } from 'src/app/shared/regiao/regiao.module';
// import { ItemComponent } from './sub-form/item/item.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$',
    suffix: '',
    thousands: '.'
};
@NgModule({
    declarations: [
        // SubFormComponent,
        FormPropostaComponent,
        // ItemComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        FormModule,
        UploadModule,
        PoliceModule,
        MatDatepickerModule,
        DialogModule,
        CurrencyMaskModule,
        SubFormItemPropostaModule,
        RegiaoModule
    ],
    exports: [
        FormPropostaComponent
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },

        ContatoEmpresaService
    ],
})
export class FormPropostaModule {}
