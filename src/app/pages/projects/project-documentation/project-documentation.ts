import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {marked} from 'marked';
import {firstValueFrom} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {SafeHtmlPipe} from '../../../common/pipes/safe-html-pipe';

@Component({
  selector: 'project-documentation',
  imports: [
    MatProgressSpinner,
    SafeHtmlPipe
  ],
  templateUrl: './project-documentation.html',
  styleUrl: './project-documentation.scss'
})
export class ProjectDocumentation {
  @ViewChild('documentationWrapper') documentationWrapper: ElementRef | undefined;

  protected documentation: string | Promise<string> = "";
  protected documentationNotAvailableText: string = "There is no Documentation available for this project.";
  public loading: boolean = false;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public async updateDocumentation(documentationUrl: string) {
    if (documentationUrl != null && documentationUrl?.trim() != "") {
      this.loading = true;
      try {
        const markdown = await firstValueFrom(this.http.get(documentationUrl, {responseType: 'text'}));
        this.documentation = marked.parse(markdown);
      } catch (e) {
        this.documentation = `<p>${this.documentationNotAvailableText}</p>`;
      }
      this.loading = false;
      this.changeDetectorRef.detectChanges();
      this.setDocumentationHeaderLinks();
    } else {
      this.documentation = `<p>${this.documentationNotAvailableText}</p>`;
    }
  }

  //applies unique ids to all headers in the documentation, so that they can be navigated to
  private setDocumentationHeaderLinks() {
    if (this.documentationWrapper) {
      const wrapperElement = this.documentationWrapper.nativeElement as HTMLElement;
      const headers = wrapperElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      for (let i = 0; i < headers.length; i++) {
        headers[i].id = `anchor-header-${headers[i].nodeName}-${i}-_${(headers[i] as HTMLElement).innerText.replaceAll(' ', '_')}`;
        headers[i].classList.add(`anchor-element`);
      }
    }
  }
}

