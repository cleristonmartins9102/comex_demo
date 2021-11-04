import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { CaptacaoLoteComponent } from './lote.component';
import { ListaCapLoteModule } from './report/listal.module';
import { FormCapLoteModule } from './for/form-cap-lote.module';

@NgModule({
    declarations: [
        CaptacaoLoteComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        ListaCapLoteModule,
        FormCapLoteModule
    ],
    exports: [
        CaptacaoLoteComponent
    ],
    providers: [],
})
export class CaptacaoLoteModule {}
