import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'card-selector',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    NgStyle,
    MatIconButton,
  ],
  templateUrl: './card-selector.html',
  styleUrl: './card-selector.scss'
})
export class CardSelector {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() imageUrl: string = "";

  @Output() click = new EventEmitter<MouseEvent>();

  protected additionalColor: string = "black";

  protected onClick(args: MouseEvent) {
    this.click.emit(args);
  }

  protected get customBackgroundStyles(): Record<string, string> {
    return {
      '--card-background-image-url': `url("${this.imageUrl}")`,
    }
  }
}
