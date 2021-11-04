import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPropostaComponent } from './item.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { RegiaoModule } from 'src/app/shared/regiao/regiao.module';

@NgModule({
    declarations: [
        ItemPropostaComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        FormModule,
        RegiaoModule
    ],
    exports: [
        ItemPropostaComponent
    ],
    providers: [],
})
export class ItemPropostaModule {}