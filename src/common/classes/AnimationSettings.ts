import {AnimationType} from './AnimationType';

export class AnimationSettings {
  nativeElement!: HTMLElement;
  animationType!: AnimationType;
  /**
   * can be used to overwrite the default duration in seconds.
   */
  duration?: number | undefined;
  playReverse?: boolean = false;
}
