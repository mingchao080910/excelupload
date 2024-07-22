import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NzUploadModule, NzModalModule, NzMessageModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  fileList: NzUploadFile[] = [];
  isVisible = false;
  OKDisabled = true;
  @Input()
  id!: number;
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

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
