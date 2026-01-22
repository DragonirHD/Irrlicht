import {ProjectType} from '../enums/project-type';

export class Project {
  public title: string;
  public projectType: ProjectType;
  public index: number;
  public summary: string; //description of the project summarised -> a few sentences
  public oneLine: string; //description of the project in ~one sentence
  public projectStatus: string;
  public completionDateString: string;
  public youtubeLink: string;
  public itchIoLink: string;
  public workedHours: number;
  public usedSoftware: string[];
  public developedMechanics: string[];
  public coverImageName: string; //name with filetype of the cover image
  public summaryImagesNames: string[]; //names with filetypes of the images that can be used in the summary
  public mainImageName: string; //names with filetypes of the main images
  public documentationName: string;

  //properties automatically populated in project-service.ts (don't have to be added in Json file)
  public folderName: string = "";
  public coverImageUrl: string = "";
  public summaryImagesUrls: string[] = [];
  public mainImageUrl: string = "";
  public documentationUrl: string = "";

  constructor(params: {
    title?: string;
    projectType: ProjectType;
    index: number;
    summary: string;
    oneLine: string;
    projectStatus?: string;
    completionDateString?: string;
    youtubeLink?: string;
    itchIoLink?: string;
    workedHours: number;
    usedSoftware: string[];
    developedMechanics: string[];
    coverImageName: string;
    summaryImagesNames: string[];
    mainImageName: string;
    documentationName: string;
  }) {
    this.title = params.title ?? "unnamed Project";
    this.projectType = params.projectType;
    this.index = params.index;
    this.summary = params.summary;
    this.oneLine = params.oneLine;
    this.projectStatus = params.projectStatus ?? "undetermined";
    this.completionDateString = params.completionDateString ?? "undetermined";
    this.youtubeLink = params.youtubeLink ?? "";
    this.itchIoLink = params.itchIoLink ?? "";
    this.workedHours = params.workedHours;
    this.usedSoftware = params.usedSoftware;
    this.developedMechanics = params.developedMechanics;
    this.coverImageName = params.coverImageName;
    this.summaryImagesNames = params.summaryImagesNames;
    this.mainImageName = params.mainImageName;
    this.documentationName = params.documentationName;
  }
}
