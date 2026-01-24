import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {ThemeToggleComponent} from './common/components/theme-toggle/theme-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {AnimationHandler} from './services/animation-handler';
import {AnimationType} from './common/classes/AnimationType';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SidenavModeToggle} from './common/components/sidenav-mode-toggle/sidenav-mode-toggle';
import {ProjectService} from './services/project-service';
import {FullPageLoader} from './common/components/full-page-loader/full-page-loader';
import {ScrollToTopButton} from './common/components/scroll-to-top-button/scroll-to-top-button';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {CdkScrollable} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatSidenavModule, ThemeToggleComponent, MatButtonModule, MatMenuModule, RouterLink, MatListModule, MatTooltipModule, SidenavModeToggle, FullPageLoader, ScrollToTopButton, MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild("sidenav") sidenav: MatDrawer | undefined;
  @ViewChild("sidenavToggleButton") sidenavToggleButton: MatIconButton | undefined;
  @ViewChild(CdkScrollable) scrollableElement: CdkScrollable | undefined;

  protected projectNames: string[];
  protected projectTreeDataSource: SideNavNode[] = [];
  protected childrenAccessor = (node: SideNavNode) => node.children ?? [];
  protected hasChild = (_: number, node: SideNavNode) => !!node.children && node.children.length > 0;

  constructor(
    private readonly animationHandler: AnimationHandler,
    private readonly router: Router,
    private readonly projectService: ProjectService,
  ) {
    //on routing changes, the sidenav should close if it is in the "over" mode.
    this.router.events.subscribe((event) => {
      if (this.sidenav?.mode == "over") {
        this.sidenav.close();
      }

      //on routing changes, scroll back to the top. Has to be done like this because Angular Routing can only scroll window, and no other elements
      if (event instanceof NavigationEnd) {
        this.scrollableElement?.scrollTo({top: 0, left: 0});
      }
    });

    this.projectNames = this.projectService.projectFolderNames;
    this.projectNames.reverse();

    this.populateSidenav();
  }

  private populateSidenav() {
    //Get all projectNames and turn them into nodes for the sidenav
    let projectNodes: SideNavNode[] = [];
    this.projectNames.forEach(projectName => {
      projectNodes.push({
        name: projectName.replaceAll('_', ' '),
        route: `projects/${projectName}`
      });
    });

    //Building all sidenav buttons.
    this.projectTreeDataSource = [
      {
        name: 'Home',
        iconName: 'home',
        route: ''
      },
      {
        name: 'Projects',
        iconName: 'flag',
        route: '',
        children: projectNodes
      },
      {
        name: 'Team',
        iconName: 'groups',
        route: 'team'
      },
      {
        name: 'Contact',
        iconName: 'chat',
        route: 'contact'
      }
    ];
  }

  protected onSidenavToggleButtonClick(): void {
    if (this.sidenavToggleButton) {
      this.animationHandler.playOnce({
        nativeElement: this.sidenavToggleButton._elementRef.nativeElement,
        animationType: AnimationType.RotationFull,
      });
    }
    this.sidenav?.toggle();
  }

  protected onSiteNamePointerEnter(): void {
    let siteNameElement = (document.getElementById("siteName"));
    if (siteNameElement) {
      this.animationHandler.playOnce({
        nativeElement: siteNameElement,
        animationType: AnimationType.Wobble,
      });
    }
  }

  protected onSiteNameClick(): void {
    let siteNameElement = (document.getElementById("siteName"));
    if (siteNameElement) {
      this.animationHandler.playOnce({
        nativeElement: siteNameElement,
        animationType: AnimationType.Wobble,
      });
    }
  }
}

interface SideNavNode {
  name: string;
  iconName?: string;
  route: string;
  children?: SideNavNode[];
}
