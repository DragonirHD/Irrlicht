import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {ThemeToggleComponent} from '../components/theme-toggle/theme-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {AnimationHandler} from '../services/animation-handler';
import {AnimationType} from '../common/classes/AnimationType';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SidenavModeToggle} from '../components/sidenav-mode-toggle/sidenav-mode-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatSidenavModule, ThemeToggleComponent, MatButtonModule, MatMenuModule, RouterLink, MatListModule, MatTooltipModule, SidenavModeToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild("sidenav") sidenav: MatDrawer | undefined;
  @ViewChild("sidenavToggleButton") sidenavToggleButton: MatIconButton | undefined;

  constructor(private readonly animationHandler: AnimationHandler, private router: Router) {
    //on routing changes, the sidenav should close if it is in the "over" mode.
    this.router.events.subscribe(() => {
      if (this.sidenav?.mode == "over") {
        this.sidenav.close();
      }
    })
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
