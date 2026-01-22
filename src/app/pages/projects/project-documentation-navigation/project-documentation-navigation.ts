import {Component, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from "@angular/material/tree";
import {AnimationType} from '../../../common/classes/AnimationType';
import {AnimationHandler} from '../../../services/animation-handler';

@Component({
  selector: 'project-documentation-navigation',
  imports: [
    MatButton,
    MatFabButton,
    MatIcon,
    MatTree,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle
  ],
  templateUrl: './project-documentation-navigation.html',
  styleUrl: './project-documentation-navigation.scss'
})
export class ProjectDocumentationNavigation {
  @ViewChild('documentationNavigationToggleButton') documentationNavigationToggleButton: MatFabButton | undefined;
  protected navigationExpanded = false;
  protected documentationNavigationDataSource: DocumentationNode[] = [];
  protected childrenAccessor = (node: DocumentationNode) => node.children ?? [];
  protected hasChild = (_: number, node: DocumentationNode) => !!node.children && node.children.length > 0;

  constructor(
    private readonly animationHandler: AnimationHandler,
  ) {
  }

  public updateDocumentationNavigation() {
    let documentationAnchors = document.getElementsByClassName("anchor-element");
    let documentationNodes: DocumentationNode[] = [];
    let lastH1Anchor: DocumentationNode | undefined;
    let lastH2Anchor: DocumentationNode | undefined;

    for (let anchor of documentationAnchors) {
      let documentationNode: DocumentationNode = {
        name: anchor.id.slice(anchor.id.indexOf("_") + 1).replaceAll('_', ' '),
        route: anchor.id,
        children: []
      }
      let anchorElementType = anchor.id.slice(14, anchor.id.indexOf("-", 14));
      switch (anchorElementType) {
        case 'H1':
          lastH1Anchor = documentationNode;
          documentationNodes.push(documentationNode);
          break;
        case 'H2':
          lastH2Anchor = documentationNode;
          lastH1Anchor?.children.push(documentationNode);
          break;
        case 'H3':
          lastH2Anchor?.children.push(documentationNode);
          break;
      }
    }

    this.documentationNavigationDataSource = documentationNodes;
  }

  public documentationNavigationToggle() {
    if (this.documentationNavigationToggleButton) {
      this.animationHandler.playOnce({
        nativeElement: this.documentationNavigationToggleButton._elementRef.nativeElement.getElementsByTagName('mat-icon')[0] as HTMLElement,
        animationType: AnimationType.RotationFull,
      });
    }
    this.navigationExpanded = !this.navigationExpanded;
  }

  protected async documentationNavigationNodeClicked(headerId: string) {
    document.getElementById(headerId)?.scrollIntoView({behavior: 'smooth'});
  }
}

interface DocumentationNode {
  name: string;
  route: string;
  children: DocumentationNode[];
}
