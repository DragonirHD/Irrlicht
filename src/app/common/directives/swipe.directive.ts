import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

/**
 * Can be applied to html elements to check if they have been swiped horizontally.
 * If a horizontal swipe is detected, depending on the direction, `next` or `previous` will be emitted
 *
 * @Remarks
 * This directive originally comes from a stackoverflow post from ronnain
 * and has since been expanded upon.
 *
 * The original post and code can be found here:
 * https://stackoverflow.com/a/67553519
 */
@Directive({selector: '[swipe]'})
export class SwipeDirective {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  swipeCoord = [0, 0];
  swipeStartTimestamp = 0;
  swipeCancelled = false;

  constructor() {
  }

  @HostListener('touchstart', ['$event']) onSwipeStart($event: TouchEvent) {
    this.onSwipe($event, 'start');
  }

  @HostListener('touchend', ['$event']) onSwipeEnd($event: TouchEvent) {
    this.onSwipe($event, 'end');
  }

  @HostListener('touchcancel') onSwipeCancel() {
    this.swipeCancelled = true;
  }

  onSwipe(e: TouchEvent, when: string) {
    this.swipe(e, when);
  }

  swipe(e: TouchEvent, when: string): void {

    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeStartTimestamp = e.timeStamp;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = e.timeStamp - this.swipeStartTimestamp;
      const distance = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);
      const velocity = distance / duration;

      if (!this.swipeCancelled // swipe hasn't been cancelled during swiping
        && duration < 1000 // fast enough
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3) // Horizontal enough
        && velocity > 0.3 // enough velocity (more than 0.3 pixels per ms)
      ) {
        const swipeDir = direction[0] < 0 ? 'next' : 'previous';
        if (swipeDir === 'next') {
          this.next.emit();
        } else {
          this.previous.emit();
        }
      }

      this.swipeCancelled = false;
    }
  }
}
