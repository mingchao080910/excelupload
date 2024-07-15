import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { FileManagementService } from './file-management.service';
import { CreateFileManagementDto } from './dto/create-file-management.dto';
import { UpdateFileManagementDto } from './dto/update-file-management.dto';

@Controller('fileManagement')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  // 上传数据
  @Post()
  create(@Body() createFileManagementDto: CreateFileManagementDto) {
    // 传递数据新建到数据库里
    return this.fileManagementService.create(createFileManagementDto);
  }
  @Get()
  findAll() {
    return this.fileManagementService.findAll();
  }

  @Get('download/:filename')
  download(@Param() param: any) {
    return this.fileManagementService.download(param.filename);
  }
}
