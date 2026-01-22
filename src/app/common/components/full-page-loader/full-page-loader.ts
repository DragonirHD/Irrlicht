import {Component} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Observable} from 'rxjs';
import {LoaderService} from '../../../services/loader.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'full-page-loader',
  imports: [
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './full-page-loader.html',
  styleUrl: './full-page-loader.scss'
})
export class FullPageLoader {
  loading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;
  }
}
