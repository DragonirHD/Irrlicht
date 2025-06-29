import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {ThemeToggleComponent} from '../components/theme-toggle/theme-toggle';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatDrawerContainer, MatDrawer, ThemeToggleComponent, MatButton, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatList, MatListItem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild("sidenavToggleButton") sidenavToggleButton: MatIconButton | undefined;
  @ViewChild("sidenav") sidenav: MatDrawer | undefined;

  protected onSidenavToggleButtonClick(): void {
    this.sidenavToggleButton?._elementRef.nativeElement.classList.remove('animation__icon-switch');
    void this.sidenavToggleButton?._elementRef.nativeElement.offsetWidth; //trigger reflow
    this.sidenavToggleButton?._elementRef.nativeElement.classList.add('animation__icon-switch');
    this.sidenav?.toggle();
  }
}
