import { Injectable, Param, StreamableFile } from '@nestjs/common';
import { CreateFileManagementDto } from './dto/create-file-management.dto';
import { UpdateFileManagementDto } from './dto/update-file-management.dto';
import { createReadStream } from 'fs';
import { FileManagement } from './entities/file-management.entity';
import { join } from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class FileManagementService {
  constructor(
    @InjectRepository(FileManagement)
    private fileManagementRepository: Repository<FileManagement>,
  ) {}

  // 下载文件
  download(filename: string) {
    const file = createReadStream(join(process.cwd(), 'excelfiles/a.xlsx'));
    return new StreamableFile(file, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: `attachment; filename=${filename}.xlsx`,
    });
  }

  // 生成下载记录的信息.
  create(createFileManagementDto: CreateFileManagementDto) {
    const newRaw = this.fileManagementRepository.create(
      createFileManagementDto,
    );
    console.log(newRaw);
    return this.fileManagementRepository.save(newRaw);
  }

  // 返回所有数据
  findAll() {

    return this.fileManagementRepository.find({})
  }
}
