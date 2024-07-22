import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AddDeleteComponent } from './add-delete/add-delete.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-crudtable',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './crudtable.component.html',
  styleUrl: './crudtable.component.css',
})
export class CRUDTableComponent {
  constructor(
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) {}

  // CRUD Fields
  @Input()
  getAllURL: string = '';
  @Input()
  deleteOneURL: string = '';

  deleteRaw = (rawdata: any) => {
    this.http.post(this.deleteOneURL, rawdata).subscribe((res: any) => {
      this.nzMessageService.success(`成功删除${res.affected}条数据`);
      this.getAllData();
    });
  };
  _colDefs: ColDef<any>[] = [
    {
      field: 'Action',
      cellRenderer: AddDeleteComponent,
      cellRendererParams: {
        deleteRaw: this.deleteRaw,
      },
    },
  ];
  @Input()
  set colDefs(value: ColDef<any>[]) {
    this._colDefs = value.concat(this._colDefs);
  }
  rowData: any[] = [];
  themeClass = 'ag-theme-quartz';

  onGridReady(params: GridReadyEvent) {
    this.getAllData();
  }
  getAllData() {
    this.http
      .get<any[]>(this.getAllURL)
      .subscribe((data) => (this.rowData = data));
  }
}
