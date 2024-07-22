import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { AuthServiceService } from '../../../auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [
    NzModalModule,
    MultipleSelectComponent,
    NzSwitchModule,
    FormsModule,
    NzButtonModule,
    CommonModule,
  ],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css',
})
export class CreateTestComponent implements OnInit {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  measurementItems: string = '';
  listOfOptionPhone = [];
  listOfOptionPhone_selected = [];
  listOfOptionBand = [];
  listOfOptionBand_selected = [];
  listOfOptionFeatureName = ['DLCA', 'CCSW'];
  listOfOptionFeatureName_selected = [];
  switchValue = false;
  timeOfNow = moment().format('YYYY-MM-DD HH:MM');
  downloadLinks: string[] = [];
  clickedItems = new Set<string>(); //点击a标签后的颜色变化
  constructor(private http: HttpClient, private auth: AuthServiceService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get('/api/phone').subscribe((data: any) => {
      this.listOfOptionPhone = data.map((d: any) => d.Phone);
    });

    this.http.get('/api/feature').subscribe((data: any) => {
      this.listOfOptionFeatureName = data.map((d: any) => d.Feature);
    });
    this.http.get('/api/band').subscribe((data: any) => {
      this.listOfOptionBand = data.map((d: any) => d.Band);
    });
  }
  handleOk(): void {
    this.isVisible = false;
    this.hideModal.emit(false);
    // 保存至服务器
    this.submit_data();
    this.clear();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit(false);
    this.clear();
  }
  clear() {
    this.downloadLinks = [];
    this.measurementItems = '';
    this.listOfOptionBand_selected = [];
    this.listOfOptionFeatureName_selected = [];
    this.listOfOptionPhone_selected = [];
  }
  createDownloadLink() {
    let arr: string[] = [];
    this.auth.getUser().subscribe((user: any) => {
      user = JSON.parse(user);
      console.log(user);
      this.listOfOptionPhone_selected.forEach((d: string) => {
        this.listOfOptionBand_selected.forEach((e: string) => {
          this.listOfOptionFeatureName_selected.forEach((f: string) => {
            arr.push(
              `${user.userName}~${moment().format('YYYYMMDD')}~${d}-${e}-${f}`
            );
          });
        });
      });
      this.downloadLinks = arr;
    });
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
      UploadedLinks:''
    };
    this.http.post('api/fileManagement', raw_data).subscribe((res) => {
      console.log(res);
      this.hideModal.emit(true);
    });
  }
}
