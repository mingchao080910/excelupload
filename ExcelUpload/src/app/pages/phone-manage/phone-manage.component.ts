import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CRUDTableComponent } from '../crudtable/crudtable.component';
import { ColDef } from 'ag-grid-community';
import { InputModalComponent } from '../input-modal/input-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phone-manage',
  standalone: true,
  imports: [CRUDTableComponent, InputModalComponent, FormsModule],
  templateUrl: './phone-manage.component.html',
  styleUrl: './phone-manage.component.css',
})
export class PhoneManageComponent {
  colDefs: ColDef<any>[] = [{ field: 'id' }, { field: 'Phone' }];
  constructor(private http: HttpClient) {}
  @ViewChild(CRUDTableComponent) crudTable!: CRUDTableComponent;
  isVisible = false;
  values!: any;
  showModalControl() {
    this.isVisible = true;
  }
  hanndelValuesChange(values: any) {

    this.http.post('/api/phone', { Phone: values }).subscribe(
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
