import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollHelperService {

  /**
   * Scrolls to the top of the given element.
   * If no element is given, it will instead use a default element, which is the main scrollable element in most cases
   * @param element
   */
  public scrollToTop(element?: HTMLElement) {
    let scrollElement;
    if (element) {
      scrollElement = element;
    } else {
      scrollElement = document.getElementsByClassName('mat-drawer-content')[0];
    }

    scrollElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
