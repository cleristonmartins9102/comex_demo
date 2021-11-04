import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaItemPadraoFatComponent } from './report.component';
import { ListaItemPadraoModule } from 'src/app/comercial/servico/servico-padrao/report/lista.module';

@NgModule({
    declarations: [
        ListaItemPadraoFatComponent
    ],
    imports: [ 
        CommonModule,
        ListaItemPadraoModule
    ],
    exports: [],
    providers: [],
})
export class ListaItemPadraoFatModule {}