import {delay, filter, Subject} from 'rxjs';
import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

/**
 * Can be applied to html elements to check if they are visible on the display.
 *
 * @Remarks
 * This directive originally comes from a blogpost from Giancarlo Buomprisco
 * and has been expanded upon.
 *
 *
 * The original blogpost and code can be found here:
 * https://giancarlobuomprisco.com/angular/intersection-observer-with-angular
 */
@Directive({
  selector: '[observeVisibility]',
})
export class ObserveVisibilityDirective
  implements OnDestroy, OnInit, AfterViewInit {
  /**
   * can be added to make sure that the user is actually seeing the element
   * when `visible` is emitted and isn't just quickly scrolling by.
   *
   * A time between 200-300ms is recommended if needed.
   *
   * @Remarks
   * Number is in milliseconds.
   */
  @Input() debounceTime = 0;

  /**
   * Indicates at what percentage the callback should be executed,
   * meaning at what percentage of visibility of the element.
   *
   * Default is right away (1%) so when the first parts (most of the time the top) of the element come into view.
   * 100 would be if the element is fully visible.
   *
   * @Remarks
   * Number is in percentage.
   */
  @Input() threshold = 1;

  /**
   * Will emit when the element is deemed visible.
   *
   * The `HTMLElement` of the element itself is sent back as a parameter in the event.
   */
  @Output() visible = new EventEmitter<HTMLElement>();

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    this.subject$.complete();
  }

  private isVisible(element: HTMLElement) {
    return new Promise(resolve => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });

      observer.observe(element);
    });
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (isIntersecting(entry)) {
          this.subject$.next({entry, observer});
        }
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .pipe(delay(this.debounceTime), filter(Boolean))
      .subscribe(async ({entry, observer}) => {
        const target = entry.target as HTMLElement;
        const isStillVisible = await this.isVisible(target);

        if (isStillVisible) {
          this.visible.emit(target);
          observer.unobserve(target);
        }
      });
  }
}
