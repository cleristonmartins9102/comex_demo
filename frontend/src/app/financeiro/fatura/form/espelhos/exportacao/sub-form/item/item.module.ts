import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemComponent } from './item.component';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { UploadSharedModule } from 'src/app/shared/upload/upload.module';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MoedaService } from 'src/app/shared/form/pessoa/service/moeda.service';

@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        PoliceModule,
        UploadSharedModule,
        CurrencyMaskModule
    ],
    exports: [
        ItemComponent
    ],
    providers: [
        MoedaService,
        TipoDocumentoService
    ],
})
export class ItemModule {}
