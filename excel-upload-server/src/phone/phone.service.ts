import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}
  create(createPhoneDto: CreatePhoneDto) {
    const raw = this.phoneRepository.create(createPhoneDto);

    return this.phoneRepository.save(raw);
  }

  findAll() {
    return this.phoneRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} phone`;
  }

  update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return `This action updates a #${id} phone`;
  }

  remove(raw: any) {
    return this.phoneRepository.delete(raw);
  }
}
