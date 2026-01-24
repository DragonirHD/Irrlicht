import {Component, OnInit} from '@angular/core';
import {ObserveVisibilityDirective} from "../../common/directives/observe-visibility-directive";
import {TeamMember} from '../../common/classes/TeamMember';
import {TeamMemberService} from '../../services/team-member-service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MemberCard} from './member-card/member-card';

@Component({
  selector: 'team',
  imports: [
    ObserveVisibilityDirective,
    MatProgressSpinner,
    MemberCard
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {
  protected teamMembers: TeamMember[] | undefined;
  protected loading: boolean = false;

  constructor(
    private readonly teamMemberService: TeamMemberService
  ) {
  }

  async ngOnInit() {
    this.loading = true;
    this.teamMembers = await this.teamMemberService.getTeamMembers();
    this.loading = false;
  }

  protected contentPaneVisible(contentPane: HTMLElement) {
    contentPane.classList.add('animation__fadeIn-up');
  }
}
