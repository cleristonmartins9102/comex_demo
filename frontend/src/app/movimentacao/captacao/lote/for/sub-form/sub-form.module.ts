import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormLoteComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemModule } from './item/item.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
    declarations: [
        SubFormLoteComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        ItemModule,
        CurrencyMaskModule
    ],
    exports: [
        SubFormLoteComponent
    ],
    providers: [
    ],
})
export class SubFormLoteModule {}
