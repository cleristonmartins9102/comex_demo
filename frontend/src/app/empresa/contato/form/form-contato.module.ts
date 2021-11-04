import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';

import { SubFormModule } from 'src/app/shared/form/sub-form/sub-form.module';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { DialogModule } from 'src/app/shared/dialos/dialog/dialog.module';
import { FormGrupoContatoComponent } from './form.component';
import { DialogFormContatoComponent } from './dialog/dialog.component';
import { SubFormContatoModule } from './sub-form/sub-form.module';

@NgModule({
    declarations: [
        FormGrupoContatoComponent,
        DialogFormContatoComponent,
    ],
    entryComponents: [
        DialogFormContatoComponent
    ],

    imports: [
        CommonModule,
        FormModule,
        MaterialModule,
        SubFormModule,
        DialogModule,
        SubFormContatoModule
    ],
    exports: [],
    providers: [
        GetEmpresaService,
    ],
})
export class FormContatoModule {}
