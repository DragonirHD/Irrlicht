import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TeamMember} from '../common/classes/TeamMember';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  public readonly TeamMemberFolderPath: string = "teamMembers/";
  //array of all Team Member folder names.
  //Needs to be updated when adding a new Team Member.
  public readonly teamMemberFolderNames: string[] = [
    'Benjamin',
    'Mochi',
    'Momo',
  ];

  assetFolderName: string = 'assets';

  constructor(private http: HttpClient) {
  }


  public async getTeamMembers(): Promise<TeamMember[]> {
    const teamMembers: TeamMember[] = [];
    const requestedTeamMemberNames: string[] = this.teamMemberFolderNames;
    for (const folderName of requestedTeamMemberNames) {
      const infoFilePath = `${this.TeamMemberFolderPath}${folderName}/teamMemberInfo.json`;
      let teamMember = new TeamMember(await this.getTeamMemberFromFilePath(infoFilePath));

      //populate fields that aren't defined in the json file
      teamMember.folderName = folderName;
      if (teamMember.imageName) {
        teamMember.imageUrl = `${this.TeamMemberFolderPath}${folderName}/${this.assetFolderName}/${teamMember.imageName}`;
      }

      teamMembers.push(teamMember);
    }

    //sort the projects by their index
    teamMembers.sort((a, b) => {
      return a.index - b.index;
    });

    return teamMembers;
  }

  private async getTeamMemberFromFilePath(infoFilePath: string) {
    return lastValueFrom(this.http.get<TeamMember>(infoFilePath));
  }
}
