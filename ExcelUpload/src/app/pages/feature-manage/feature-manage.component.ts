import { Component, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CRUDTableComponent } from '../crudtable/crudtable.component';
import { HttpClient } from '@angular/common/http';
import { InputModalComponent } from '../input-modal/input-modal.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-feature-manage',
  standalone: true,
  imports: [CRUDTableComponent,InputModalComponent,FormsModule],
  templateUrl: './feature-manage.component.html',
  styleUrl: './feature-manage.component.css',
})
export class FeatureManageComponent {
  colDefs: ColDef<any>[] = [{ field: 'id' }, { field: 'Feature' }];

  constructor(private http: HttpClient) {}
  @ViewChild(CRUDTableComponent) crudTable!: CRUDTableComponent;
  isVisible = false;
  values!: any;
  showModalControl() {
    this.isVisible = true;
  }
  hanndelValuesChange(values: any) {

    this.http.post('/api/feature', { Feature: values }).subscribe(
      () => {
        // 刷新数据
        this.crudTable.getAllData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
