import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'home',
  imports: [
    NgStyle
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  @ViewChild('cursorLight') cursorLight = HTMLElement;
  protected cursorTop: number = 0;
  protected cursorLeft: number = 0;
  protected scrollTop: number = 0;

  ngAfterViewInit() {
    //get the position of the cursor to adjust the position of the cursorLight accordingly
    document.body.onpointermove = (event: PointerEvent) => {
      this.cursorTop = event.clientY;
      this.cursorLeft = event.clientX;
    }

    //get the scrollTop amount to calculate the position of the cursorLight.
    //else it would not move with the content when a scroll event occurs.
    const drawerContent = document.getElementsByClassName("mat-drawer-content")[0];
    drawerContent.addEventListener("scroll", () => {
      console.log(drawerContent.scrollTop);
      this.scrollTop = drawerContent.scrollTop;
    })
  }

  protected get cursorLightCssVariables(): Record<string, string> {
    return {
      '--cursorLightTop': `${this.cursorTop}px`,
      '--cursorLightLeft': `${this.cursorLeft}px`,
      '--scrollTop': `${this.scrollTop}px`,
    }
  }
}
