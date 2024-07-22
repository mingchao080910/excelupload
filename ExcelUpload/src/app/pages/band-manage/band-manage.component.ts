import { Component, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CRUDTableComponent } from '../crudtable/crudtable.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputModalComponent } from '../input-modal/input-modal.component';

@Component({
  selector: 'app-band-manage',
  standalone: true,
  imports: [CRUDTableComponent,FormsModule,InputModalComponent],
  templateUrl: './band-manage.component.html',
  styleUrl: './band-manage.component.css',
})
export class BandManageComponent {
  colDefs: ColDef<any>[] = [{ field: 'id' }, { field: 'Band' }];


  constructor(private http: HttpClient) {}
  @ViewChild(CRUDTableComponent) crudTable!: CRUDTableComponent;
  isVisible = false;
  values!: any;
  showModalControl() {
    this.isVisible = true;
  }
  hanndelValuesChange(values: any) {

    this.http.post('/api/band', { Band: values }).subscribe(
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
