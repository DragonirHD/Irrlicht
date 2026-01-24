import {TeamMemberSkillType} from './TeamMemberSkillType';

export class TeamMember {
  public index: number;
  public firstName: string;
  public lastName: string;
  public teamMemberSkills: TeamMemberSkillType[];
  public description: string;
  public imageName?: string;

  public folderName: string = "";
  public imageUrl: string = "";

  constructor(params: {
    index: number;
    firstName: string;
    lastName?: string;
    teamMemberSkills: TeamMemberSkillType[];
    description: string;
    imageName?: string;
  }) {
    this.index = params.index;
    this.firstName = params.firstName;
    this.lastName = params.lastName ?? "";
    this.teamMemberSkills = params.teamMemberSkills;
    this.description = params.description;
    this.imageName = params.imageName;
  }

  public getSkillText(): string[] {
    return this.teamMemberSkills.map((skill) => {
      let skillString = "";
      switch (skill) {
        case TeamMemberSkillType.MotivationalSupport:
          skillString = "Motivational Support";
          break;
        case TeamMemberSkillType.GraphicDesign:
          skillString = "Graphic Design";
          break;
        case TeamMemberSkillType.GameProgramming:
          skillString = "Game Programming";
          break;
        case TeamMemberSkillType.GameTesting:
          skillString = "Game Testing";
          break;
        case TeamMemberSkillType.GameDesign:
          skillString = "Game Design";
          break;
        case TeamMemberSkillType.AudioDesign:
          skillString = "Audio Design";
          break;
        case TeamMemberSkillType.WebDesign:
          skillString = "Web Design";
          break;
        case TeamMemberSkillType.Storytelling:
          skillString = "Storytelling";
          break;
      }

      return skillString;
    });
  }
}
