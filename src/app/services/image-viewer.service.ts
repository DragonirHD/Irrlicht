import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialog} from '../common/components/image-dialog/image-dialog';

@Injectable({
  providedIn: 'root'
})
export class ImageViewerService {
  private readonly dialog = inject(MatDialog);

  public showImageDialog(imageUrl: string) {
    this.dialog.open(ImageDialog, {
      width: 'auto',
      maxWidth: '100vw',
      minWidth: '20vw',
      data: {
        imageUrl: imageUrl
      }
    });
  }
}
