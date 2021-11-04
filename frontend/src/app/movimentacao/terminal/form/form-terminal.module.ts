import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { FormTerminalComponent } from './form.component';
import { TerminalBackEndService } from '../service/backend.service';

@NgModule({
    declarations: [
        FormTerminalComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        DialogModule
    ],
    exports: [],
    providers: [
        ColumnContainer,
        ColumnDocumentos,
        GetEmpresaService,
        TerminalBackEndService
    ],
})
export class FormTerminalModule {}
