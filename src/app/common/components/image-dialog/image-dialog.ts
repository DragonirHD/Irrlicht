import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.html',
  styleUrl: './image-dialog.scss'
})
export class ImageDialog {
  data = inject(MAT_DIALOG_DATA);
}
