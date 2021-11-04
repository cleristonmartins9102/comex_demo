import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { MaterialModule } from 'src/app/shared/module/material.module';
import { ColumnsModel } from './columns';
import { ExpPanelServicoComponent } from './expansion-panel/expansion-panel.component';
import { FormModule } from '../module/form.module';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { DialogHistoricoModule } from '../dialos/dialog-historico/dialog-historico.module';
import { ArmFilterModule } from './arm-filter/arm-filter.module';

@NgModule({
    declarations: [
        ReportComponent,
        ExpPanelServicoComponent,
        MenuComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        DialogHistoricoModule,
        ArmFilterModule
    ],
    entryComponents: [
        ReportComponent,
    ],
    exports: [
        ReportComponent,
        ExpPanelServicoComponent
    ],
    providers: [
        ColumnsModel
    ],
})
export class ReportModule {}
