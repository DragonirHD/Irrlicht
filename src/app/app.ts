import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {ThemeToggleComponent} from '../components/theme-toggle/theme-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {AnimationHandler} from '../services/animation-handler';
import {AnimationType} from '../common/classes/AnimationType';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatSidenavModule, ThemeToggleComponent, MatButtonModule, MatMenuModule, RouterLink, MatListModule, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild("sidenav") sidenav: MatDrawer | undefined;
  @ViewChild("sidenavToggleButton") sidenavToggleButton: MatIconButton | undefined;
  @ViewChild("sidenavModeToggleButton") sidenavModeToggleButton: MatIconButton | undefined;

  protected sidenavMode: MatDrawerMode = "over";
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

  protected onSidenavModeToggleButtonClick(): void {
    if (this.sidenav?.mode == "over") {
      this.sidenavMode = "side";
    } else {
      this.sidenavMode = "over";
    }

    if (this.sidenavModeToggleButton) {
      console.log(this.sidenavMode)
      this.animationHandler.playOnce({
        nativeElement: this.sidenavModeToggleButton?._elementRef.nativeElement,
        animationType: AnimationType.RotationHalf,
        playReverse: this.sidenavMode == "side"
      });
    }
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
