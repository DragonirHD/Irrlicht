import {AfterViewInit, Component, ElementRef, Input, OnDestroy, signal, ViewChild, WritableSignal} from '@angular/core';
import {NgStyle} from '@angular/common';

/**
 * Used to make a grid of pixels that either show up as a trail behind the cursor
 * or if the user doesn't have a cursor, will be shown at random.
 *
 * @Remark
 * Parts of this code have been made by following a tutorial from "Daily Fire" on the webpage "medium"
 *
 * The tutorial and original code can be found here: https://medium.com/@dailyfire/cursor-trails-3-simple-css-tricks-to-add-to-any-website-part-1-64750798583c
 */
@Component({
  selector: 'pixels-overlay',
  imports: [
    NgStyle
  ],
  templateUrl: './pixels-overlay.html',
  styleUrl: './pixels-overlay.scss'
})
export class PixelsOverlay implements AfterViewInit, OnDestroy {
  @ViewChild('pixelsOverlayContainer') pixelsOverlayContainer: ElementRef | undefined;

  //height and with of the pixels in px (best case a number that is dividable by 16 and 9 for good tiling on different screen sizes).
  @Input() pixelSize: number = 72;
  //maximum amount of consecutively hovered pixels for the automatic animation.
  @Input() maxRandomHoverPixels: number = 20;
  //minimum amount of consecutively hovered pixels for the automatic animation.
  @Input() minRandomHoverPixels: number = 7;

  protected pixels: WritableSignal<{ id: number, type: number }[]> = signal([]);
  private resizeObserver: ResizeObserver | undefined;


  ngAfterViewInit() {
    if (this.pixelsOverlayContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustPixelsToContainerSize();
      });
      this.resizeObserver.observe(this.pixelsOverlayContainer.nativeElement);
    }

    //check if users main input can toggle hover states and is fine (basically checking if the input is something like a mouse)
    const canHover = window.matchMedia(`(hover: hover)`).matches &&
      matchMedia('(pointer: fine)').matches;

    //if user has no input that can toggle hover states, we animate the hover states of the pixels programmatically.
    if (!canHover) {
      setInterval(() => {
        this.hoverRandomPixels();
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.unobserve(this.pixelsOverlayContainer?.nativeElement);
  }

  private adjustPixelsToContainerSize() {
    if (this.pixelsOverlayContainer) {
      this.pixels.set([]); //reset pixels in case we already had generated pixels before.
      const horizontalPixelsCount = Math.floor(this.pixelsOverlayContainer.nativeElement.offsetWidth / this.pixelSize);
      const verticalPixelsCount = Math.floor(this.pixelsOverlayContainer.nativeElement.offsetHeight / this.pixelSize);
      const pixelsAmount = horizontalPixelsCount * verticalPixelsCount;

      //generate the pixels
      for (let i = 0; i < pixelsAmount; i++) {
        const randomType = Math.floor(Math.random() * 3);
        const pixel = {id: i, type: randomType};
        this.pixels.update(values => {
          return [...values, pixel]
        });
      }
    }
  }

  /**adds and removes the class `pixel--hover` from random pixels to simulate them being hovered over.
   *
   * Random Values:
   * - amount of pixels going into the hover state
   * - which pixels go into the hover state
   * - when each individual pixel goes into hover state
   * - how long each individual pixel stays in the hover state
   *
   * @private
   */
  private hoverRandomPixels() {
    const pixelsAmount = this.pixels().length;

    //making sure that max and min values aren't outside the length of our pixels array.
    const max = pixelsAmount < this.maxRandomHoverPixels ? pixelsAmount : this.maxRandomHoverPixels;
    const min = pixelsAmount > this.minRandomHoverPixels ? this.minRandomHoverPixels : 0;

    //deciding how many pixels should go into hover state
    const hoverPixelsAmount = Math.floor(Math.random() * (max - min)) + min;

    const hoverPixelNumbers: number[] = [];
    for (let i = 0; i < hoverPixelsAmount; i++) {
      const hoverPixelNumber = Math.floor(Math.random() * pixelsAmount);

      //check to make sure that we don't add the same pixel twice into our array
      if (hoverPixelNumbers.some(pixel => pixel == hoverPixelNumber)) {
        i--;
      } else {
        hoverPixelNumbers.push(hoverPixelNumber);
      }
    }

    //adding the hover state to the selected pixels
    hoverPixelNumbers.forEach(pixel => {
      const hoverDelay = Math.floor(Math.random() * 1000);
      const hoverDuration = Math.floor(Math.random() * 1000) + 1000;
      setTimeout(() => {
        const pixelElement = document.getElementById(`pixel-number-${pixel}`)
        pixelElement?.classList.add("pixels-overlay__container__pixel--hover");
        setTimeout(() => {
          pixelElement?.classList.remove("pixels-overlay__container__pixel--hover");
        }, hoverDuration);
      }, hoverDelay);
    })
  }
}
