import {Injectable} from '@angular/core';
import {AnimationSettings} from '../common/classes/AnimationSettings';

@Injectable({
  providedIn: 'root'
})
export class AnimationHandler {

  constructor() {
  }

  public playOnce(settings: AnimationSettings): void {
    this.addAnimation(settings);
    this.setDurationOverride(settings);
  }

  public play(settings: AnimationSettings): void {
    this.addAnimation(settings);
    this.setDurationOverride(settings);
    settings.nativeElement.style.animationIterationCount = "infinite";
  }

  public stop(settings: AnimationSettings): void {
    settings.nativeElement.classList.remove(settings.animationType.toString());
  }

  private addAnimation(settings: AnimationSettings): void {
    settings.nativeElement.classList.remove(settings.animationType.toString());
    void settings.nativeElement.offsetWidth; //trigger reflow
    settings.nativeElement.classList.add(settings.animationType.toString());
  }

  private setDurationOverride(settings: AnimationSettings): void {
    if (settings.duration) {
      settings.nativeElement.style.animationDuration = settings.duration.toString() + 's';
    }
  }
}
