import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFaturaExpComponent } from './print-fatura.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderFaturaModule } from '../header-fatura.module';

@NgModule({
    declarations: [
        PrintFaturaExpComponent,
    ],
    imports: [
        CommonModule,
        HeaderFaturaModule
    ],
    exports: [
        PrintFaturaExpComponent
    ],
    providers: [],
})
export class PrintFaturaExpModule {}
