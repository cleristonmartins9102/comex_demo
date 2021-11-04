import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { DialogUploadComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { UploadService } from './upload.service';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule, MatButtonModule, MatDialogModule, MatListModule, FlexLayoutModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule],
  declarations: [
    UploadComponent,
    DialogUploadComponent,
  ],
  exports: [
    UploadComponent
  ],
  entryComponents: [DialogUploadComponent], // Add the DialogComponent as entry component
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
{provide: MatDialogRef, useValue: {}},
    UploadService,
]
})
export class UploadModule {}
