import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {ProjectSummaryBase} from './project-summary-base/project-summary-base';
import {ProjectService} from '../../services/project-service';
import {Project} from '../../common/classes/Project';

@Component({
  selector: 'projects',
  imports: [
    MatTabGroup,
    MatTab,
    MatTabLabel,
    ProjectSummaryBase
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  protected projects: Project[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      //TODO change shown project depending on uri params
      console.log(params);
    })

    this.projects = await this.projectService.getProjects();
    console.log(this.projects);
  }
}
