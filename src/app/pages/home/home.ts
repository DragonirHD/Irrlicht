import {Component} from '@angular/core';
import {ObserveVisibilityDirective} from '../../common/directives/observe-visibility-directive';
import {PixelsOverlay} from '../../common/components/pixels-overlay/pixels-overlay';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  imports: [
    ObserveVisibilityDirective,
    PixelsOverlay
  ],
  styleUrl: './home.scss'
})
export class Home {

  protected contentPaneVisible(contentPane: HTMLElement) {
    console.log("visible");
    contentPane.classList.add('animation__fadeIn-up');
  }
}
