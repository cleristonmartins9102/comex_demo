import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPortoComponent } from './form/form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { PortoComponent } from './porto.component';

@NgModule({
    declarations: [
        PortoComponent,
        FormPortoComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule
    ],
    exports: [],
    providers: [],
})
export class PortoModule {}
