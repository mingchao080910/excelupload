import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NzUploadModule, NzModalModule, NzMessageModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  fileList: NzUploadFile[] = [];
  isVisible = false;
  OKDisabled = true;
  clickedItems = new Set<string>(); //点击a标签后的颜色变化
  @Input()
  id!: number;
  // 传进来的行数据
  @Input()
  rowData: any;
  downloadLinks: string[] = [];
  constructor(private http: HttpClient, private message: NzMessageService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('启动');
    console.log(this.rowData);
    this.downloadLinks = this.rowData.Links.split('`');
    console.log(this.downloadLinks);
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    window.location.reload();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  uploadfile(): void {
    const formData = new FormData();
    this.checkFileLists();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('files', file, file.name); //日期+用户名+文件名
    });
    console.log(formData, this.fileList);
    this.http.post('/api/fileManagement/upload', formData).subscribe(
      (res) => {
        console.log('success', res);
        this.message.success('上传成功!请点击OK键返回!');
        // 这个时候OK才可以用
        this.updateUploadedLinks().subscribe((res) => {
          this.message.success('更新已上传文件信息到表里 !');
          this.OKDisabled = false;
          this.fileList = [];
          // this.router.navigate([this.router.url]);
        });
      },
      (err) => {
        this.message.error('上传失败,请检查原因=>' + err);
        this.OKDisabled = true;
      }
    );
  }
  checkFileLists() {
    // 检查是否在 下载的链接里
  }

  updateUploadedLinks() {
    // 更新 UploadedLinks
    let uploadedLinks = this.fileList
      .map((file) => file.name)
      .join('`')
      .replaceAll('.xlsx', '');
    return this.http.put('/api/fileManagement/' + this.id, {
      id: this.id,
      UploadedLinks: uploadedLinks,
    });
  }
}
