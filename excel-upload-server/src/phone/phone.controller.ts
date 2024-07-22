import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  findAll() {
    return this.phoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.phoneService.update(+id, updatePhoneDto);
  }

  @Post('delete')
  remove(@Body() deletePhoneDto: UpdatePhoneDto) {
    console.log('deletePhoneDto===>', deletePhoneDto);
    return this.phoneService.remove(deletePhoneDto);
  }
  @Post()
  create(@Body() createPhoneDto: CreatePhoneDto) {
   
    return this.phoneService.create(createPhoneDto);
  }
}
