import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { ActionsComponent } from './actions/actions.component';

@Component({
  selector: 'app-links-table',
  standalone: true,
  imports: [AgGridAngular, CommonModule, ActionsComponent],
  templateUrl: './links-table.component.html',
  styleUrl: './links-table.component.css',
})
export class LinksTableComponent {
  constructor(private http: HttpClient) {}
  defaultColDef: ColDef = {
    filter: true,
    resizable: true,
    sortable: true,
    wrapText: true,
  };
  rowData = [];
  @Input()
  set refresh(value: number) {
    console.log('刷新所有数据');
    this.get_all_data();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'MeasurementItems' },
    { field: 'Time' },
    { field: 'Phone' },
    { field: 'FeatureName' },
    { field: 'FeatureSwitch' },
    { field: 'Links' },
    { field: 'Action', cellRenderer: ActionsComponent },
  ];

  ngOnInit(): void {
    this.get_all_data();
  }

  get_all_data() {
    this.http
      .get('http://localhost:3000/fileManagement')
      .subscribe((res: any) => {
        this.rowData = res;
      });
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }
}
