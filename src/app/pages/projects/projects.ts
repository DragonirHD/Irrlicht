import {ChangeDetectorRef, Component, effect, model, ModelSignal, OnDestroy, OnInit, ViewChild,} from '@angular/core';
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
import {SwipeDirective} from '../../common/directives/swipe.directive';

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
    SwipeDirective,
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
  protected loading: boolean = false;

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
    this.projects.reverse();

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

  protected onSummarySwipe(next: boolean) {
    if (next && this.summaryTabGroupSelectedIndex() < this.summaryTabGroup!._tabs.length - 1) {
      this.summaryTabGroupSelectedIndex.set(this.summaryTabGroupSelectedIndex() + 1);
      return;
    }

    if (!next && this.summaryTabGroupSelectedIndex() > 0) {
      this.summaryTabGroupSelectedIndex.set(this.summaryTabGroupSelectedIndex() - 1);
    }
  }

  protected projectButtonClicked() {
    this.scrollHelperService.scrollToTop();
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
