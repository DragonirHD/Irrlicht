import {AfterViewInit, Component} from '@angular/core';
import {ScrollHelperService} from '../../../services/scrollHelper.service';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'scroll-to-top-button',
  imports: [
    MatFabButton,
    MatIcon
  ],
  templateUrl: './scroll-to-top-button.html',
  styleUrl: './scroll-to-top-button.scss'
})
export class ScrollToTopButton implements AfterViewInit {
  protected scrollElement: Element | undefined;
  protected atTop = true;

  constructor(protected scrollHelperService: ScrollHelperService) {
  }

  ngAfterViewInit() {
    this.scrollElement = document.getElementsByClassName('mat-drawer-content')[0];
    fromEvent(this.scrollElement, 'scroll').subscribe(() => {
      this.atTop = this.scrollElement!.scrollTop == 0;
    });
  }

}
