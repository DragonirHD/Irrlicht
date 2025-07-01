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
    this.setPlayDirectionOverride(settings);
  }

  public play(settings: AnimationSettings): void {
    this.addAnimation(settings);
    this.setDurationOverride(settings);
    this.setPlayDirectionOverride(settings);
    settings.nativeElement.style.animationIterationCount = "infinite";
  }

  public stop(settings: AnimationSettings): void {
    settings.nativeElement.classList.remove(settings.animationType.toString());
  }

  private addAnimation(settings: AnimationSettings): void {
    //Clean up styles from element before adding new animation.
    settings.nativeElement.classList.remove(settings.animationType.toString());

    //trigger reflow, else the classList won't update
    void settings.nativeElement.offsetWidth;

    //add given animation class to classList
    settings.nativeElement.classList.add(settings.animationType.toString());
  }

  private setDurationOverride(settings: AnimationSettings): void {
    if (settings.duration) {
      settings.nativeElement.style.animationDuration = settings.duration.toString() + 's';
    }
  }

  private setPlayDirectionOverride(settings: AnimationSettings): void {
    if (settings.playReverse) {
      settings.nativeElement.style.animationDirection = "reverse";
    }
  }
}
