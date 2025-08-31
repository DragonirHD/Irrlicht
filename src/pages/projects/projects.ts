import {Component, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {ProjectSummaryBase} from './project-summary-base/project-summary-base';
import {ProjectService} from '../../services/project-service';
import {Project} from '../../common/classes/Project';
import {CardSelector} from '../../components/card-selector/card-selector';

@Component({
  selector: 'projects',
  imports: [
    MatTabGroup,
    MatTab,
    MatTabLabel,
    ProjectSummaryBase,
    CardSelector,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  @ViewChild('summaryTabGroup') summaryTabGroup: MatTabGroup | undefined;
  protected projects: Project[] = [];
  protected summaryTabGroupSelectedIndex: number = 0;
  protected lastTouchStart: WritableSignal<Touch | undefined> = signal(undefined);
  protected lastTouchMove: WritableSignal<Touch | undefined> = signal(undefined);

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      //TODO change shown project depending on uri params
      console.log(params);
    })

    this.projects = await this.projectService.getProjects();
    console.log(this.projects);
  }

  /**Used to add very limited swipe support to our tab group.*/
  protected summarySwipeEnd() {
    //We need to use the value of "touchmove" here instead of "touchend" because "touchend.touches" will only have items if we use multiple pointers.

    //if we have a no value for the start or end position of our swipe, we can't calculate where we swiped.
    if (!this.lastTouchStart() || !this.lastTouchMove()) {
      return;
    }

    if (this.lastTouchStart()!.clientX > this.lastTouchMove()!.clientX
      && this.summaryTabGroupSelectedIndex < this.summaryTabGroup!._tabs.length) {
      this.summaryTabGroupSelectedIndex++;
    }

    if (this.lastTouchStart()!.clientX < this.lastTouchMove()!.clientX
      && this.summaryTabGroupSelectedIndex > 0) {
      this.summaryTabGroupSelectedIndex--;
    }
  }

  protected summarySwipeCancel() {
    //if we run into a situation where the swipe is cancelled,
    //we reset the last saved values to not accidentally swipe if the user didn't decide to do so.
    this.lastTouchStart.set(undefined);
    this.lastTouchMove.set(undefined);
  }
}
