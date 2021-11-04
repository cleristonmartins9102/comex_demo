import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFormGruAceComponent } from './sub-form.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { FormModule } from 'src/app/shared/module/form.module';
import { ItemModule } from './item/item.module';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { FormularioComponent } from './formulario/formulario.component';
import { ViewComponent } from './view/view.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { SubModuloComponent } from './sub-modulo/sub-modulo.component';
import { AplicacaoComponent } from './aplicacao/aplicacao.component';

@NgModule({
    declarations: [
        SubFormGruAceComponent,
        AplicacaoComponent,
        FormularioComponent,
        ViewComponent,
        RelatorioComponent,
        SubModuloComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        ItemModule
    ],
    exports: [
        SubFormGruAceComponent
    ],
    providers: [
    ],
})
export class SubFormGruAceModule {}
