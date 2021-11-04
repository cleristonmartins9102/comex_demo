import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmpresaComponent } from './form-empresa.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

@NgModule({
    declarations: [
        FormEmpresaComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule
    ],
    exports: [],
    providers: [],
})
export class FormEmpresaModule {}
