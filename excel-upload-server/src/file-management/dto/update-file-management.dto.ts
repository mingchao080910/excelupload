import { PartialType } from '@nestjs/mapped-types';
import { CreateFileManagementDto } from './create-file-management.dto';

export class UpdateFileManagementDto {
  id: number;
  UploadedLinks: string;
}
