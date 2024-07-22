import { Injectable, Param, StreamableFile } from '@nestjs/common';
import { CreateFileManagementDto } from './dto/create-file-management.dto';
import { createReadStream } from 'fs';
import { FileManagement } from './entities/file-management.entity';
import path, { join } from 'path';
import * as fs from 'fs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFileManagementDto } from './dto/update-file-management.dto';
@Injectable()
export class FileManagementService {
  constructor(
    @InjectRepository(FileManagement)
    private fileManagementRepository: Repository<FileManagement>,
  ) {}

  // 下载文件
  download(filename: string) {
    console.log(filename);
    let returnFileName = filename.match('CCSW') ? 'CCSW' : 'DLCA';

    const file = createReadStream(
      join(process.cwd(), `excelfiles/${returnFileName}.xlsx`),
    );
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
    return this.fileManagementRepository.find({});
  }

  upload(file: Express.Multer.File) {
    try {
      let filename = Buffer.from(file.originalname, 'latin1').toString('utf-8');
      // 设置要写入的文件路径

      const directoryPath = join(
        process.cwd(),
        'uploads',
        filename.split('~')[0],
        filename.split('~')[1],
      );
      filename = join(directoryPath, filename);

      // 确保所有目录都存在，如果不存在则创建
      fs.mkdirSync(directoryPath, { recursive: true });

      // 写入文件
      fs.writeFileSync(filename, file.buffer);
      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }

  remove(id: number) {
    this.fileManagementRepository.delete(id);
  }
  update(updateFileManagementDto: UpdateFileManagementDto) {
    const { id } = updateFileManagementDto;
    return this.fileManagementRepository.update(id, updateFileManagementDto);
  }
}
