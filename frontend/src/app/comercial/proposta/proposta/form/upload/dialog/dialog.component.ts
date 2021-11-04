import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';

import { UploadService } from '../upload.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogUploadComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Enviar';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  fileInfo: any = {};
  title: String;
  public files: Set<File> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogUploadComponent>,
    public uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
  }



  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog

    if (this.uploadSuccessful) {
      return this.dialogRef.close(this.fileInfo);
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.data.infoUp);
    this.fileInfo = this.progress;

    // console.log(this.progress);
    for (const key in this.progress.status) {
      this.progress[key].status.progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress.status) {
      allProgressObservables.push(this.progress[key].status.progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Fechar';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    this.canBeClosed = true;
    this.uploadSuccessful = true;


    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
