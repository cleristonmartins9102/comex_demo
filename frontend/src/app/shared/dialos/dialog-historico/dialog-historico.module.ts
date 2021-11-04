import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogHistoricoComponent } from './dialog-historico.component';
import { MaterialModule } from '../../module/material.module';

@NgModule({
    declarations: [
        DialogHistoricoComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    entryComponents: [
        DialogHistoricoComponent
    ],
    exports: [
        DialogHistoricoComponent
    ],
    providers: [],
})
export class DialogHistoricoModule {}
