import {
  ChangeDetectorRef,
  Component,
  effect,
  model,
  ModelSignal,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {ProjectSummaryBase} from './project-summary-base/project-summary-base';
import {ProjectService} from '../../services/project-service';
import {Project} from '../../common/classes/Project';
import {CardSelector} from '../../common/components/card-selector/card-selector';
import {ProjectDocumentation} from './project-documentation/project-documentation';
import {filter, firstValueFrom, Subscription} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ScrollHelperService} from '../../services/scrollHelper.service';
import {ProjectDocumentationNavigation} from './project-documentation-navigation/project-documentation-navigation';

@Component({
  selector: 'projects',
  imports: [
    MatTabGroup,
    MatTab,
    MatTabLabel,
    ProjectSummaryBase,
    CardSelector,
    RouterLink,
    ProjectDocumentation,
    MatProgressSpinner,
    ProjectDocumentationNavigation,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit, OnDestroy {
  @ViewChild('summaryTabGroup') summaryTabGroup: MatTabGroup | undefined;
  @ViewChild('projectDocumentation') projectDocumentation: ProjectDocumentation | undefined;
  @ViewChild('projectDocumentationNavigation') projectDocumentationNavigation: ProjectDocumentationNavigation | undefined;
  protected projects: Project[] = [];
  protected routerSubscription: Subscription | undefined;
  protected summaryTabGroupSelectedIndex: ModelSignal<number> = model(0);
  protected lastTouchStart: WritableSignal<Touch | undefined> = signal(undefined);
  protected lastTouchMove: WritableSignal<Touch | undefined> = signal(undefined);
  protected loading: boolean = false;
  protected minSwipeDistance = 25; //minimum distance in pixels that the user has to swipe from side to side that a swipe is registered

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly scrollHelperService: ScrollHelperService,
  ) {
    effect(async () => {
      const selectedIndex = this.summaryTabGroupSelectedIndex();
      await this.projectDocumentation?.updateDocumentation(this.projects[selectedIndex].documentationUrl);
      this.projectDocumentationNavigation?.updateDocumentationNavigation();
    });
  }

  async ngOnInit() {
    this.loading = true;
    this.projects = await this.projectService.getProjects();

    //Get initial project from route
    const routeParams = await firstValueFrom(this.route.params);
    const routeProjectIndex = this.projects.findIndex((project) => project.folderName == routeParams["projectName"]);
    if (routeProjectIndex != -1) {
      this.summaryTabGroupSelectedIndex.set(routeProjectIndex);
    }

    //Subscribe to route changes to switch projects if the route is adjusted
    //TODO change this to directly use val instead of awaiting the route params
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(async (val) => {
      const routeParams = await firstValueFrom(this.route.params);
      const routeProjectIndex = this.projects.findIndex((project) => project.folderName == routeParams["projectName"]);
      if (routeProjectIndex != -1) {
        this.summaryTabGroupSelectedIndex.set(routeProjectIndex);
      }
    });

    this.loading = false;
    this.changeDetectorRef.detectChanges();
    await this.projectDocumentation?.updateDocumentation(this.projects[this.summaryTabGroupSelectedIndex()].documentationUrl);
    this.changeDetectorRef.detectChanges();
    this.projectDocumentationNavigation?.updateDocumentationNavigation();
  }

  /**Used to add very limited swipe support to our tab group.*/
  protected summarySwipeEnd() {
    //We need to use the value of "touchmove" here instead of "touchend" because "touchend.touches" will only have items if we use multiple pointers.

    //if we have no value for the start or end position of our swipe, we can't calculate where we swiped.
    if (!this.lastTouchStart() || !this.lastTouchMove()) {
      return;
    }

    if (this.lastTouchStart()!.clientX > this.lastTouchMove()!.clientX
      && this.lastTouchStart()!.clientX - this.lastTouchMove()!.clientX > this.minSwipeDistance
      && this.summaryTabGroupSelectedIndex() < this.summaryTabGroup!._tabs.length - 1) {
      this.summaryTabGroupSelectedIndex.set(this.summaryTabGroupSelectedIndex() + 1);
    }

    if (this.lastTouchStart()!.clientX < this.lastTouchMove()!.clientX
      && this.lastTouchMove()!.clientX - this.lastTouchStart()!.clientX > this.minSwipeDistance
      && this.summaryTabGroupSelectedIndex() > 0) {
      this.summaryTabGroupSelectedIndex.set(this.summaryTabGroupSelectedIndex() - 1);
    }
  }

  protected summarySwipeCancel() {
    //if we run into a situation where the swipe is canceled,
    //we reset the last saved values to not accidentally swipe if the user didn't decide to do so.
    this.lastTouchStart.set(undefined);
    this.lastTouchMove.set(undefined);
  }

  protected projectButtonClicked() {
    this.scrollHelperService.scrollToTop();
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
