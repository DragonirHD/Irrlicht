import {Component, effect, input, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDrawer, MatDrawerMode} from '@angular/material/sidenav';
import {AnimationType} from '../../common/classes/AnimationType';
import {AnimationHandler} from '../../services/animation-handler';

@Component({
  selector: 'sidenav-mode-toggle',
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './sidenav-mode-toggle.html',
  styleUrl: './sidenav-mode-toggle.scss'
})
export class SidenavModeToggle {
  @ViewChild("sidenavModeToggleButton") sidenavModeToggleButton: MatIconButton | undefined;

  sidenav = input.required<MatDrawer>();

  protected currentSidenavMode: WritableSignal<MatDrawerMode> = signal("over");

  constructor(private readonly animationHandler: AnimationHandler) {
    const localMode = localStorage.getItem('sidenavMode');
    if (localMode) {
      //check if the user has already visited the site once and has a selected mode
      this.currentSidenavMode.set(localMode as MatDrawerMode);
    } else {
      //if the user has not yet visited the site, we check the window width to see if we need to save on screenspace and use the "over" mode.
      //the sidenav has a width of 360px, so if the complete width is smaller than double of that, we use "over" to save on space.
      if (window.innerWidth <= 720) {
        this.currentSidenavMode.set("over");
      } else {
        this.currentSidenavMode.set("side");
      }

      localStorage.setItem('sidenavMode', this.currentSidenavMode());
    }

    effect(() => {
      if (this.sidenav()) {
        this.sidenav().mode = this.currentSidenavMode();
        this.updateGlobalVariables();
      }
    });
  }

  protected onSidenavModeToggleButtonClick(): void {
    if (this.sidenav().mode == "over") {
      this.currentSidenavMode.set("side");
    } else {
      this.currentSidenavMode.set("over");
    }

    localStorage.setItem('sidenavMode', this.currentSidenavMode());

    if (this.sidenavModeToggleButton) {
      this.animationHandler.playOnce({
        nativeElement: this.sidenavModeToggleButton?._elementRef.nativeElement,
        animationType: AnimationType.RotationHalf,
        playReverse: this.currentSidenavMode() == "side"
      });
    }
  }

  //used to update global css variables so that other elements can easily adjust to state changes of the sidenav.
  private updateGlobalVariables(): void {
    const root = document.documentElement;
    root.style.setProperty("--sidenav-mode", this.currentSidenavMode());
    root.style.setProperty("--sidenav-open", this.sidenav().opened ? "true" : "false");
    root.style.setProperty("--sidenav-open-width", this.sidenav().opened ? window.getComputedStyle(root).getPropertyValue('--sidenav-width') : "0px");
    console.log(window.getComputedStyle(root).getPropertyValue('--sidenav-width'));
  }
}
