import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {ThemeToggleComponent} from '../components/theme-toggle/theme-toggle';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatList, MatListItem} from '@angular/material/list';
import {AnimationHandler} from '../services/animation-handler';
import {AnimationType} from '../common/classes/AnimationType';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatDrawerContainer, MatDrawer, ThemeToggleComponent, MatButton, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatList, MatListItem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild("sidenav") sidenav: MatDrawer | undefined;
  @ViewChild("sidenavToggleButton") sidenavToggleButton: MatIconButton | undefined;

  constructor(private readonly animationHandler: AnimationHandler) {
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
