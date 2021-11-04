import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxemailComponent } from './boxemail.component';
import { MaterialModule } from '../../module/material.module';
import { FormModule } from '../../module/form.module';
import { SafeHtmlPipe } from './safehtml.pipe';
import { SendEmailService } from './service/send-email.service';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
    declarations: [
        BoxemailComponent,
        SafeHtmlPipe,
        OcorrenciasComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormModule,
        RichTextEditorAllModule
    ],
    entryComponents: [
        BoxemailComponent,
        OcorrenciasComponent
    ],
    exports: [
        BoxemailComponent
    ],
    providers: [
        SendEmailService
    ],
})
export class BoxMailModule {}
