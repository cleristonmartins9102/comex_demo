import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPacoteComponent } from './form-pacote.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

@NgModule({
    declarations: [
        FormPacoteComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
    ],
    exports: [
        FormPacoteComponent
    ],
    providers: [],
})
export class PacoteFormModule {}
