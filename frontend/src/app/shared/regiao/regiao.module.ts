import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/material.module';
import { RegiaoComponent } from './regiao.component';
import { FormModule } from '../module/form.module';

@NgModule({
    declarations: [
        RegiaoComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        FormModule
    ],
    exports: [
        RegiaoComponent
    ],
    providers: [],
})
export class RegiaoModule {}