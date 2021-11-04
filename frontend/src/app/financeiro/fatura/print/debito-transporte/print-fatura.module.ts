import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFaturaTrcComponent } from './print-fatura.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderFaturaModule } from '../header-fatura.module';

@NgModule({
    declarations: [
        PrintFaturaTrcComponent,
    ],
    imports: [
        CommonModule,
        HeaderFaturaModule
    ],
    exports: [
        PrintFaturaTrcComponent
    ],
    providers: [],
})
export class PrintFaturaTrcModule {}
