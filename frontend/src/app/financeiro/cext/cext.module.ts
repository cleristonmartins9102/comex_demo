import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCextModule } from './form/form.module';
import { ListaCextModule } from './report/lista-cext.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormCextModule,
        ListaCextModule
    ],
    exports: [],
    providers: [],
})
export class CextModule {}
