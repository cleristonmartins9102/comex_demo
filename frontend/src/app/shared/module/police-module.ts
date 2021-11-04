import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from '../directive/number-only.service';

@NgModule({
    declarations: [
        NumberOnlyDirective
    ],
    imports: [ CommonModule ],
    exports: [
        NumberOnlyDirective
    ],
    providers: [],
})
export class PoliceModule {}
