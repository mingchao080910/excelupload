import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [
    NzModalModule,
    MultipleSelectComponent,
    NzSwitchModule,
    FormsModule,
    NzButtonModule,
  ],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css',
})
export class CreateTestComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  measurementItems: string = '';
  listOfOptionPhone = ['iphone', 'HUAWEI', 'XIAOMI'];
  listOfOptionPhone_selected = [];
  listOfOptionBand = ['Band1', 'Band12', 'Band13'];
  listOfOptionBand_selected = [];
  listOfOptionFeatureName = ['DLCA', 'CCSW'];
  listOfOptionFeatureName_selected = [];
  switchValue = false;
  timeOfNow = new Date();
  downloadLinks: string[] = [];
  constructor(private http: HttpClient) {}

  handleOk(): void {
    this.isVisible = false;
    this.hideModal.emit(false);
    // 保存至服务器
    this.submit_data()
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit(false);
  }

  createDownloadLink() {
    let arr: string[] = [];
    this.listOfOptionBand_selected.forEach((d: string) => {
      this.listOfOptionFeatureName_selected.forEach((e: string) => {
        this.listOfOptionPhone_selected.forEach((f: string) => {
          arr.push(d + e + f);
        });
      });
    });
    this.downloadLinks = arr;
  }
  SelectionChanged(event: any) {
    if (event[1] === 'Phone') {
      this.listOfOptionPhone_selected = event[0];
    } else if (event[1] === 'Band') {
      this.listOfOptionBand_selected = event[0];
    } else if (event[1] === 'Featurename') {
      this.listOfOptionFeatureName_selected = event[0];
    }
  }

  submit_data() {
    let raw_data = {
      MeasurementItems: this.measurementItems,
      Time: this.timeOfNow,
      Phone: this.listOfOptionPhone_selected.join('`'),
      Band: this.listOfOptionBand_selected.join('`'),
      FeatureName: this.listOfOptionFeatureName_selected.join('`'),
      FeatureSwitch: this.switchValue,
      Links: this.downloadLinks.join('`'),
    };
    this.http.post('http://localhost:3000/fileManagement', raw_data).subscribe((res) => {
      console.log(res);
      this.hideModal.emit(true);
    });
  }
}
