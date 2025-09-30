import {Injectable} from '@angular/core';
import {Project} from '../common/classes/Project';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public readonly projectFileFolderPath: string = "../projectFiles/";
  //array of all project names / file names in the projectFiles folder.
  //Needs to be updated when adding a new project.
  public readonly projectFolderNames: string[] = [
    'test',
    'test2',
  ];

  assetFolderName: string = 'assets';

  constructor(private http: HttpClient) {
  }

  /**
   * Returns a sorted list of the projectInfo.json files defined in the `projectNames` parameter as type "Project"
   *
   * If `projectNames` is undefined, a sorted list of all projectInfo.json files as type "Project" is returned.
   *
   * @remarks
   * If a project seems to be missing, make sure that the `projectFolderNames` array inside `project-service.ts` is up to date
   *
   * @param projectNames a string array of the projectNames that should be returned. Can be left empty to receive the full list of the projects.
   */
  public async getProjects(projectNames?: string[]): Promise<Project[]> {
    const projects: Project[] = [];
    const requestedProjectNames: string[] = projectNames ? projectNames : this.projectFolderNames;
    for (const folderName of requestedProjectNames) {
      const infoFilePath = `${this.projectFileFolderPath}${folderName}/projectInfo.json`;
      let project = await this.getProjectFromFilePath(infoFilePath);
      project = this.populateImageUrls(project, folderName);
      projects.push(project);
    }

    //sort the projects by their index
    projects.sort((a, b) => {
      return a.index - b.index;
    });

    return projects;
  }

  private async getProjectFromFilePath(infoFilePath: string) {
    return lastValueFrom(this.http.get<Project>(infoFilePath));
  }

  /**
   * uses the given `imageName` properties in the project to locate and save the corresponding `imageUrl` (file paths) into the project.
   *
   * If no name is given for a specific image type, the corresponding url will be left as an empty string
   *
   * @remarks
   * Doesn't check if there is a valid file at the given path. If an `imageName` property is defined but no file with that name is present in the folder structure, the path wil still be generated, pointing to a nonexistent file.
   */
  private populateImageUrls(unpopulatedProject: Project, folderName: string): Project {
    const project = structuredClone(unpopulatedProject);
    //populate coverImage
    if (project.coverImageName) {
      project.coverImageUrl = `${this.projectFileFolderPath}${folderName}/${this.assetFolderName}/${project.coverImageName}`;
    }

    //populate summary images
    if (project.summaryImagesNames) {
      project.summaryImagesNames.forEach((imageName) => {
        project.summaryImagesUrls.push(`${this.projectFileFolderPath}${folderName}/${this.assetFolderName}/${imageName}`);
      });
    }

    //populate main images
    if (project.mainImagesNames) {
      project.mainImagesNames.forEach((imageName) => {
        project.mainImagesUrls.push(`${this.projectFileFolderPath}${folderName}/${this.assetFolderName}/${imageName}`);
      });
    }

    return project;
  }
}
