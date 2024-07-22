import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { ActionsComponent } from './actions/actions.component';
import { LinksIconsComponent } from './links-icons/links-icons.component';

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
  refreshDataGrid = () => {
    this.get_all_data();
  };
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'MeasurementItems' },
    { field: 'Time' },
    { field: 'Phone' },
    { field: 'FeatureName' },
    { field: 'FeatureSwitch',wrapHeaderText:true},
    { field: 'Links', width: 400,cellRenderer:LinksIconsComponent },
    {
      field: 'Action',
      cellRenderer: ActionsComponent,
      cellRendererParams: { refreshDataGrid: this.refreshDataGrid },
    },
  ];

  ngOnInit(): void {
    this.get_all_data();
  }

  get_all_data() {
    this.http.get('/api/fileManagement').subscribe((res: any) => {
      this.rowData = res;
    });
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    this.get_all_data();
  }
}
