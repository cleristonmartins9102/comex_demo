import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPadraoFormModule } from './form/form.module';
import { ListaItemPadraoModule } from './report/lista.module';

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        ItemPadraoFormModule,
        ListaItemPadraoModule,
     ],
    exports: [],
    providers: [],
})
export class ItemPadraoModule {}