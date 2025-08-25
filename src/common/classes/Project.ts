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
  public coverImageUrl: string = ""; //automatically generated in project-service.ts
  public summaryImagesNames: string[] = []; //names with filetypes of the images that can be used in the summary
  public summaryImagesUrls: string[] = []; //automatically generated in project-service.ts
  public mainImagesNames: string[] = []; //names with filetypes of the main images
  public mainImagesUrls: string[] = []; //automatically generated in project-service.ts
}
