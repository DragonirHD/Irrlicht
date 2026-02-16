import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ObserveVisibilityDirective} from '../../common/directives/observe-visibility-directive';
import {PixelsOverlay} from '../../common/components/pixels-overlay/pixels-overlay';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CardSelector} from '../../common/components/card-selector/card-selector';
import {ProjectService} from '../../services/project-service';
import {Project} from '../../common/classes/Project';
import {TypewriterService} from '../../services/typewriter.service';
import {RouterLink} from '@angular/router';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AnimationHandler} from '../../services/animation-handler';
import {AnimationType} from '../../common/classes/AnimationType';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  imports: [
    ObserveVisibilityDirective,
    PixelsOverlay,
    AsyncPipe,
    CardSelector,
    RouterLink,
    MatFabButton,
    MatIcon,
  ],
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  @ViewChild("mobileButton") mobileButton: MatFabButton | undefined;

  protected readonly titleWords: string[] = [
    'pixel',
    'word',
    'line',
    'frame'
  ];
  protected activeTitleWord: Observable<string> | undefined;

  protected featuredProject: Project | undefined;

  constructor(
    private readonly projectService: ProjectService,
    private readonly typewriterService: TypewriterService,
    private readonly animationHandler: AnimationHandler,
  ) {

  }

  async ngAfterViewInit() {
    this.activeTitleWord = this.typewriterService.getTypewriterEffect(this.titleWords);

    //get a random project to display in the "featured project" area
    const randomProjectIndex = Math.floor(Math.random() * this.projectService.projectFolderNames.length);
    const randomProjectName = this.projectService.projectFolderNames.at(randomProjectIndex);
    this.featuredProject = await this.projectService.getProjects([randomProjectName!]).then((projects) => projects[0]);
  }

  protected contentPaneVisible(contentPane: HTMLElement) {
    contentPane.classList.add('animation__fadeIn-up');
  }

  protected mobileButtonClick() {
    if (this.mobileButton) {
      this.animationHandler.playOnce({
        nativeElement: this.mobileButton._elementRef.nativeElement,
        animationType: AnimationType.Wobble,
        duration: 0.5
      });
    }
  }
}
