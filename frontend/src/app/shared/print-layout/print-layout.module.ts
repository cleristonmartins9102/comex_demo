import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintLayoutRoutingModule } from './print-layout.routing.module';
import { PrintLayoutComponent } from './print-layout.component';
import { BodyEspelhoFaturaModule } from 'src/app/financeiro/fatura/print/body/body-espelho.module';

@NgModule({
    declarations: [
        PrintLayoutComponent
    ],
    imports: [
        CommonModule,
        PrintLayoutRoutingModule,
        BodyEspelhoFaturaModule,
    ],
    exports: [BodyEspelhoFaturaModule],
    providers: [],
})
export class PrintLayoutModule {}
