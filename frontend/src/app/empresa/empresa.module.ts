import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaComponent } from './empresa.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/module/nav.module';
import { MaterialModule } from '../shared/module/material.module';
import { ColumnsModel } from './empresa/report/lista-empresas/columns';
import { GetEmpresaService } from './service/get-empresa.service';
import { ListaEmpresasModule } from './empresa/report/lista-empresas/lista-empresas.module';
import { ContatoModule } from './contato/contato.module';
import { FormEmpresaModule } from './empresa/form/form-empresa.module';
import { PessoaModule } from '../shared/form/pessoa/pessoa.module';
import { RelEmpresasModule } from './empresa/report/rel-empresas/lista-empresas.module';

@NgModule({
  declarations: [
   EmpresaComponent,
  ],

  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormEmpresaModule,
    PessoaModule,
    ListaEmpresasModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ContatoModule,
    RelEmpresasModule
 ],
 exports: [
 ],
  providers: [
    ColumnsModel,
    GetEmpresaService
  ],
})
export class EmpresaModule {}
