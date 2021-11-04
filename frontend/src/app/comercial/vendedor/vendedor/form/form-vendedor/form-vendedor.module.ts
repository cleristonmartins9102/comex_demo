import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVendedorComponent } from './form-vendedor.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { VendedorService } from '../../service/backend.service';

@NgModule({
    declarations: [
        FormVendedorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule
    ],
    exports: [],
    providers: [
        VendedorService
    ],
})
export class FormVendedorModule {}
