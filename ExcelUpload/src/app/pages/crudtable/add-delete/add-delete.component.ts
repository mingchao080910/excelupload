import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@Component({
  selector: 'app-add-delete',
  standalone: true,
  imports: [NzPopconfirmModule],
  templateUrl: './add-delete.component.html',
  styleUrl: './add-delete.component.css',
})
export class AddDeleteComponent implements ICellRendererAngularComp {
  public params!: any;

  constructor() {}
  cancel(): void {}

  confirm(): void {
    this.params.deleteRaw(this.params.data);
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
