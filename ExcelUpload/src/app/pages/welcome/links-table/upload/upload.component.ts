import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NzUploadModule, NzModalModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  fileList: NzUploadFile[] = [
    // {
    //   uid: '1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/xxx.png',
    // },
    // {
    //   uid: '2',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/yyy.png',
    // },
    // {
    //   uid: '3',
    //   name: 'zzz.png',
    //   status: 'error',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/zzz.png',
    // },
  ];
  isVisible = false;

  constructor(private http: HttpClient) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  uploadfile = (item: any):Subscription => {
    console.log(item);
    return this.http.post('uploadfile', {}).subscribe();
  };
}
