import {Component} from '@angular/core';
import {ObserveVisibilityDirective} from "../../common/directives/observe-visibility-directive";

@Component({
  selector: 'contact',
  imports: [
    ObserveVisibilityDirective
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

  protected contentPaneVisible(contentPane: HTMLElement) {
    contentPane.classList.add('animation__fadeIn-up');
  }
}
