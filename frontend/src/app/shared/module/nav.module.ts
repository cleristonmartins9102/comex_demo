import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from '../material/nav/nav.component';
import { NavButtonComponent } from '../material/nav-button/nav-button.component';
import { SubButtonComponent } from '../material/nav-button/sub-button/sub-button.component';
import { MaterialModule } from './material.module';
import { LoggedModule } from '../material/logged/logged.module';

@NgModule({
    declarations: [
        NavComponent,
        NavButtonComponent,
        SubButtonComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        LoggedModule
    ],
    exports: [
        NavComponent,
        NavButtonComponent,
        SubButtonComponent,
    ],
    providers: [],
})
export class SharedModule {}
