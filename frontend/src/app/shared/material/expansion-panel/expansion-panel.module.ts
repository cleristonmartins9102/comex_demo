import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ExpansionPanelComponent } from './expansion-panel.component';
import { MaterialModule } from '../../module/material.module';
import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
    declarations: [
        ExpansionPanelComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [],
    providers: [],
})
export class ExpansionPanelModule {}
