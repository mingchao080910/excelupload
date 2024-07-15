import { Module } from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileManagementController } from './file-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManagement } from './entities/file-management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FileManagement])],
  controllers: [FileManagementController],
  providers: [FileManagementService],
})
export class FileManagementModule {}
