import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormProcessoComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemModule } from './item/item.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

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
    ],
})
export class SubFormLiberacaoModule {}
