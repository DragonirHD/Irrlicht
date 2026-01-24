import {Component, Input} from '@angular/core';
import {TeamMember} from '../../../common/classes/TeamMember';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {TeamMemberSkillType} from '../../../common/classes/TeamMemberSkillType';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'member-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    NgOptimizedImage,
    MatIcon,
    MatCardTitle
  ],
  templateUrl: './member-card.html',
  styleUrl: './member-card.scss',
})
export class MemberCard {
  @Input() member: TeamMember = new TeamMember({
    index: 0,
    firstName: "place",
    lastName: "holder",
    teamMemberSkills: [
      TeamMemberSkillType.GameDesign
    ],
    description: "placeholder member"
  });
}
