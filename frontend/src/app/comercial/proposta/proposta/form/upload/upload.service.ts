import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Address } from 'src/app/config/address';


@Injectable()
export class UploadService {
  titleDialog = 'Upload documentos do aceite';
  response: string;

  constructor(
    private http: HttpClient,
    private address: Address
    ) {}

  public upload(files: Set<File>, infoUp: string): { [key: string]: Observable<number> } {
    let url = `http://${this.address.bkAddress()[0].ip}/upload/proposta`;

    // this will be the our resulting map
    const status: any = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      url += `/${infoUp}`;
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      // console.log(formData);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('post', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();
      // send the http-request and subscribe for progress-updates
      // this.http.post('http://back-garm.ddns.net/garm/upload', formData).subscribe(dados => console.log(dados));

      const startTime = new Date().getTime();
      this.http.request(req)
      .subscribe((event: any) => {
        status.dados = event.body;

        // status.dados = event.body;
      // this.http.post(url, formData).subscribe((event:any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });
      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
