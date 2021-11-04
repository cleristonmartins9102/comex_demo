import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormEspExpComponent } from './form.component';
import { SubFormUploadModule } from '../sub-form-upload/sub-form.module';

@NgModule({
    declarations: [
        FormEspExpComponent,
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
        SubFormUploadModule
    ],
    exports: [
        FormEspExpComponent
    ],
    providers: [
        // FormDropdownService,
        // {
        //     provide: DateAdapter, useClass: AppDateAdapter
        // },
        // {
        //     provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        // }
    ],
})
export class FormEspExpModule {}
