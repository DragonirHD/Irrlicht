import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'card-selector',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    NgClass,
  ],
  templateUrl: './card-selector.html',
  styleUrl: './card-selector.scss'
})
export class CardSelector {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() imageUrl: string = "";
  @Input() disableHoloCardEffect: boolean = false;

  @Output() click = new EventEmitter<MouseEvent>();

  protected onClick(args: MouseEvent) {
    this.click.emit(args);
  }
}
