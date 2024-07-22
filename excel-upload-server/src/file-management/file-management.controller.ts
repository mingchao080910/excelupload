import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Res,
  UploadedFiles,
  Delete,
  Put,
} from '@nestjs/common';

import { Express, Response } from 'express';
import { FileManagementService } from './file-management.service';
import { CreateFileManagementDto } from './dto/create-file-management.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadfiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    try {
      files.forEach((file) => {
        this.fileManagementService.upload(file);
      });
      return res.status(200).json({ success: true });
    } catch {
      return res.status(400).json({ success: false });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileManagementService.remove(+id);
  }

  //
  //
  // !这里只更新 uploadedlinks的字段.其他不更新
  @Put(':id')
  update(@Body() updateFileManagementDto: UpdateFileManagementDto) {
    return this.fileManagementService.update(updateFileManagementDto);
  }
}
