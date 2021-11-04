import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliceModule } from '../../shared/module/police-module';
import { FormModule } from '../../shared/module/form.module';
import { MaterialModule } from '../../shared/module/material.module';
import { FormVendedorComponent } from './vendedor/form/form-vendedor/form-vendedor.component';
import { ListaVendedorModule } from './vendedor/report/lista-vendedor.module';
import { FormVendedorModule } from './vendedor/form/form-vendedor/form-vendedor.module';
import { RelVendedorModule } from './vendedor/rel_vendedores/rel-vendedor.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PoliceModule,
        FormModule,
        MaterialModule,
        ListaVendedorModule,
        FormVendedorModule,
        RelVendedorModule
    ],
    exports: [],
    providers: [
    ],
})
export class VendedorModule {}
