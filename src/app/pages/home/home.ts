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

  ngAfterViewInit() {
    if (this.pixelsOverlayContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustPixelsToContainerSize();
      });
      this.resizeObserver.observe(this.pixelsOverlayContainer.nativeElement);
    }
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

  //TODO create alternative animation for pixels for mobile users -> randomly turn on the hover state on some of the pixels
}
