import {AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild, WritableSignal} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  imports: [
    NgStyle
  ],
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('pixelsOverlayContainer') pixelsOverlayContainer: ElementRef | undefined;
  protected pixelsSize: number = 72; //height and with of the pixels in px (best case a number that is dividable by 16 and 9 for good tiling on different screen sizes).
  protected pixels: WritableSignal<{ id: number, color: number }[]> = signal([]);
  private resizeObserver: ResizeObserver | undefined;
  public maxRandomHoverPixels: number = 20;
  public minRandomHoverPixels: number = 7;

  ngAfterViewInit() {
    if (this.pixelsOverlayContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustPixelsToContainerSize();
      });
      this.resizeObserver.observe(this.pixelsOverlayContainer.nativeElement);
    }

    setInterval(() => {
      this.hoverRandomPixels();
    }, 1000);
  }

  ngOnDestroy() {
    this.resizeObserver?.unobserve(this.pixelsOverlayContainer?.nativeElement);
  }

  private adjustPixelsToContainerSize() {
    if (this.pixelsOverlayContainer) {
      this.pixels.set([]); //reset pixels in case we already had generated pixels before.
      const horizontalPixelsCount = Math.floor(this.pixelsOverlayContainer.nativeElement.offsetWidth / this.pixelsSize);
      const verticalPixelsCount = Math.floor(this.pixelsOverlayContainer.nativeElement.offsetHeight / this.pixelsSize);
      const pixelsAmount = horizontalPixelsCount * verticalPixelsCount;

      //generate the pixels
      for (let i = 0; i < pixelsAmount; i++) {
        const randomColor = Math.floor(Math.random() * 3);
        const pixel = {id: i, color: randomColor};
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
        pixelElement?.classList.add("pixel--hover");
        setTimeout(() => {
          pixelElement?.classList.remove("pixel--hover");
        }, hoverDuration);
      }, hoverDelay);
    })
  }
}
