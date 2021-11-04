import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { FormPredicadoComponent } from './form-predicado.component';
import { PredicadoService } from './service/backend.service';

@NgModule({
    declarations: [
        FormPredicadoComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule
    ],
    exports: [],
    providers: [
        PredicadoService
    ],
})
export class PredicadoModule {}
