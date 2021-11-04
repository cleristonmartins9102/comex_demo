import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { FormModule } from 'src/app/shared/module/form.module';
import { MaterialModule } from 'src/app/shared/module/material.module';

@NgModule({
    declarations: [
        SelectComponent
    ],
    imports: [ 
        CommonModule,
        MaterialModule,
        FormModule 
    ],
    exports: [
        SelectComponent
    ],
    providers: [],
})
export class SelectModule {}
