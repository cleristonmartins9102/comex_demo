import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemPadraoFormComponent } from './form.component';
import { PoliceModule } from 'src/app/shared/module/police-module';
import { ItemPadraoService } from '../service/backend.service';

@NgModule({
    declarations: [
        ItemPadraoFormComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        PoliceModule
    ],
    exports: [
        ItemPadraoFormComponent
    ],
    providers: [
        ItemPadraoService
    ],
})
export class ItemPadraoFormModule {}
