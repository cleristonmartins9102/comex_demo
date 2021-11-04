import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModule } from 'src/app/shared/report/report.module';
import { Menu } from './menu-permission';
import { ListaCextComponent } from './lista-cext.component';
import { ColumnsModel } from './columns';

@NgModule({
    declarations: [
        ListaCextComponent
    ],
    imports: [
        CommonModule,
        ReportModule
    ],
    exports: [],
    providers: [
        ColumnsModel
    ],
})
export class ListaCextModule {}
