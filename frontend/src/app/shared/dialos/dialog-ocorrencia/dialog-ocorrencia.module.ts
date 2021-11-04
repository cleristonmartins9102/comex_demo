import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOcorrenciaComponent } from './dialog-ocorrencia.component';
import { MaterialModule } from '../../module/material.module';
import { FormModule } from '../../module/form.module';

@NgModule({
    declarations: [
        DialogOcorrenciaComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule
    ],
    entryComponents: [
        DialogOcorrenciaComponent
    ],
    exports: [],
    providers: [],
})
export class DialogOcorrenciaModule {}
