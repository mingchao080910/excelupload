import { Component } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { UpdateComponent } from '../update/update.component';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular/lib/interfaces';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [UploadComponent, UpdateComponent, NzPopconfirmModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent implements ICellRendererAngularComp {
  constructor(
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) {}
  // Init Cell Value
  public params!: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log('action==>',this.params)
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
  cancel(): void {}

  confirm(): void {
    this.handelDelete();
  }
  handelDelete() {
    this.http.delete(`/api/fileManagement/${this.params.data.id}`).subscribe(
      (res: any) => {
        this.nzMessageService.success('删除成功一条数据!');
        this.params.refreshDataGrid();
      },
      (res: any) => {
        this.nzMessageService.error('删除错误!');
      }
    );
  }
}
