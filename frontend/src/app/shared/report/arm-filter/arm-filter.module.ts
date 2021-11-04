import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmFilterComponent } from './arm-filter.component';
import { MaterialModule } from '../../module/material.module';
import { FormModule } from '../../module/form.module';
import { DateComponent } from './field/date/date.component';
import { InputComponent } from './field/input/input.component';
import { PoliceModule } from '../../module/police-module';

@NgModule({
    declarations: [
        ArmFilterComponent,
        DateComponent,
        InputComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        PoliceModule
    ],
    exports: [
        ArmFilterComponent
    ],
    providers: [],
})
export class ArmFilterModule {}
