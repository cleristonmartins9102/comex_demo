import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormContatoComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { SelectModule } from './select/select.module';

@NgModule({
    declarations: [
        SubFormContatoComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        SelectModule
    ],
    exports: [
        SubFormContatoComponent
    ],
    providers: [],
})
export class SubFormContatoModule {}
