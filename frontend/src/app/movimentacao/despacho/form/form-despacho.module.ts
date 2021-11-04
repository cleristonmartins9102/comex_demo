import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { TerminalBackEndService } from '../../terminal/service/backend.service';
import { BoxMailModule } from 'src/app/shared/dialos/boxemail/boxemail.module';
import { ContainerService } from '../../container/service/container.service';
import { FormDespachoComponent } from './form.component';

@NgModule({
    declarations: [
        FormDespachoComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        BoxMailModule
    ],
    exports: [
        FormDespachoComponent
    ],
    providers: [
        ContainerService,
        ColumnContainer,
        ColumnDocumentos,
        GetEmpresaService,
        BackendService,
        TerminalBackEndService,

    ],
})
export class FormDespachoModule {}
