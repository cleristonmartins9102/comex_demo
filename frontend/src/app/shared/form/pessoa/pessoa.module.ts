import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PessoaComponent } from './pessoa.component';
import { TipoPapelService } from './service/tipo-papel.service';
import { DropdownService } from './service/dropdown.service';
import { VerificatorIdService } from './service/verify-identificador.service';
import { PoliceModule } from '../../module/police-module';
import { MaterialModule } from '../../module/material.module';
import { Address } from 'src/app/config/address';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { DialogModule } from '../../dialos/dialog/dialog.module';

@NgModule({
    declarations: [
        PessoaComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PoliceModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DialogModule
    ],
    exports: [],
    providers: [
        DropdownService,
        TipoPapelService,
        VerificatorIdService,
        Address,
        GetEmpresaService
    ],
})
export class PessoaModule {}
