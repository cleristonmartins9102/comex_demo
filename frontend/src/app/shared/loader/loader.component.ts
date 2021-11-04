import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading$: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
    // this.isLoading$;
   }

  ngOnInit() {
  }

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }

}
