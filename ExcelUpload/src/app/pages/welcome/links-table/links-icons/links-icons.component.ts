import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'app-links-icons',
  standalone: true,
  imports: [NzIconModule, NzToolTipModule],
  templateUrl: './links-icons.component.html',
  styleUrl: './links-icons.component.css',
})
export class LinksIconsComponent implements ICellRendererAngularComp {
  // Init Cell Value
  links!: string[];
  uploadedLinks!: Set<string>;
  public params!: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.getLinks();
    console.log(this.params);
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.getLinks();
    return true;
  }
  getLinks() {
    this.links = this.params.data.Links.split('`');
    this.uploadedLinks = new Set(this.params.data.UploadedLinks.split('`'));
    console.log(this.uploadedLinks)
  }
}
