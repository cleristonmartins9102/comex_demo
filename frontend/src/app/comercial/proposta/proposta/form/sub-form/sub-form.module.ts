import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubFormComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { SharedModule } from 'src/app/shared/module/nav.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemPropostaModule } from './item/item.module';

@NgModule({
    declarations: [
        SubFormComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        SharedModule,
        FormModule,
        ItemPropostaModule
    ],
    exports: [
        SubFormComponent
    ],
    providers: [],
})
export class SubFormItemPropostaModule {}