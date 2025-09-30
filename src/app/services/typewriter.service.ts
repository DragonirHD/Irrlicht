import {Injectable} from '@angular/core';
import {concat, concatMap, delay, from, ignoreElements, interval, map, of, repeat, take} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypewriterService {

  /**
   * Returns an `Observable` that can be used to get a typewriter effect on a html text.
   *
   * The function goes through the given list of words and returns them in a type-writer like queue where words get typed, then deleted and then the next word gets typed.
   * This typing is infinite and can be adjusted with the given parameters.
   *
   * To correctly use the function, assign the returned `Observable` to a variable and use it as an async variable in your html.
   *
   * @example
   * //in the ts file
   * myTypeEffectVariable = typewriterFunction.getTypewriterEffect(params);
   *
   * //in the html file
   * {{ myTypeEffectVariable | async }}
   *
   * @param words
   * a string array of all the words that the typewriterEffect will go through.
   * @param writeSpeed
   * how fast the words should be written
   * @param deleteSpeed
   * how fast the words should be deleted/removed
   * @param timeUntilWrite
   * adjusts the delay between writing and deleting where the word is fully visible
   * @param timeUntilDelete
   * adjusts the delay between deleting and writing where the word is not visible
   */
  public getTypewriterEffect(words: string[], writeSpeed: number = 120, deleteSpeed: number = 80, timeUntilWrite: number = 100, timeUntilDelete: number = 3000) {
    return from(words).pipe(
      concatMap(word => this.typeEffect(word, writeSpeed, deleteSpeed, timeUntilWrite, timeUntilDelete)),
      repeat()
    ).pipe(map((word) => word));
  }

  private typeEffect(word: string, writeSpeed: number, deleteSpeed: number, timeUntilWrite: number, timeUntilDelete: number) {
    return concat(
      this.type(word, writeSpeed),
      of('').pipe(delay(timeUntilDelete), ignoreElements()),
      this.type(word, deleteSpeed, true),
      of('').pipe(delay(timeUntilWrite), ignoreElements())
    );
  }

  private type(word: string, speed: number, backwards = false) {
    return interval(speed).pipe(
      map(x => backwards ? word.substring(0, word.length - x) : word.substring(0, x + 1)),
      take(word.length)
    );
  }
}
