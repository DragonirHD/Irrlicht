import {Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Project} from '../../../common/classes/Project';
import {ImageViewerService} from '../../../services/image-viewer.service';

@Component({
  selector: 'project-summary-base',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
  ],
  templateUrl: './project-summary-base.html',
  styleUrl: './project-summary-base.scss'
})
export class ProjectSummaryBase {
  project = input.required<Project>();

  constructor(protected imageViewerService: ImageViewerService) {
  }
}
