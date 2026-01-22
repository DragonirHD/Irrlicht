import {Component} from '@angular/core';
import {ObserveVisibilityDirective} from "../../common/directives/observe-visibility-directive";

@Component({
  selector: 'team',
  imports: [
    ObserveVisibilityDirective
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {

  protected contentPaneVisible(contentPane: HTMLElement) {
    contentPane.classList.add('animation__fadeIn-up');
  }
}
