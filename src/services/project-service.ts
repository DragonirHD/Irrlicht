import {Injectable} from '@angular/core';
import {Project} from '../common/classes/Project';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectFileFolderPath: string = "../projectFiles/";
  //array of all project names / file names in the projectFiles folder.
  //Needs to be updated when adding a new project.
  projectFolderNames: string[] = [
    'test',
    'test2',
  ];

  constructor(private http: HttpClient) {
  }

  /**
   * returns a sorted list of all projectInfo.json files as type "Project"
   *
   * @remarks
   * If a project seems to be missing, make sure that the `projectFolderNames` array inside `project-service.ts` is up to date
   */
  public async getProjects(): Promise<Project[]> {
    const projects: Project[] = [];
    for (const folderName of this.projectFolderNames) {
      const infoFilePath = `${this.projectFileFolderPath}${folderName}/projectInfo.json`;
      this.http.get(infoFilePath).subscribe((res) => {
          projects.push(res as Project);
        }
      );
    }

    //sort the projects by their index
    projects.sort((a, b) => {
      return a.index - b.index;
    });

    return projects;
  }
}
