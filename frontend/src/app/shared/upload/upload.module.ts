import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { UploadServiceShared } from './upload.service';
import { DialogComponent } from './dialog/dialog.component';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule, MatButtonModule, MatDialogModule, MatListModule, FlexLayoutModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule],
  declarations: [
    UploadComponent,
    DialogComponent,
  ],
  exports: [
    UploadComponent
  ],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
{provide: MatDialogRef, useValue: {}},
  UploadServiceShared
]
})
export class UploadSharedModule {}
