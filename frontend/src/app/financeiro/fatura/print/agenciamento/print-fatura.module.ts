import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintFaturaAgeComponent } from './print-fatura.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderFaturaModule } from '../header-fatura.module';

@NgModule({
    declarations: [
        PrintFaturaAgeComponent,
    ],
    imports: [
        CommonModule,
        HeaderFaturaModule
    ],
    exports: [
        PrintFaturaAgeComponent
    ],
    providers: [],
})
export class PrintFaturaAgeModule {}
