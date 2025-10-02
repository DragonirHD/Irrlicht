export class Project {
  public title: string = "";
  public index: number = 0;
  public mainText: string = ""; //description of the project
  public summary: string = ""; //description of the project summarised -> a few sentences
  public oneLine: string = ""; //description of the project in ~one sentence
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public workedHours: number = 0;
  public usedTechnologies: string[] = [];
  public coverImageName: string = ""; //name with filetype of the cover image
  public summaryImagesNames: string[] = []; //names with filetypes of the images that can be used in the summary
  public mainImagesNames: string[] = []; //names with filetypes of the main images

  //properties automatically populated in project-service.ts (don't have to be added in Json file)
  public folderName: string = "";
  public coverImageUrl: string = "";
  public summaryImagesUrls: string[] = [];
  public mainImagesUrls: string[] = [];
}
