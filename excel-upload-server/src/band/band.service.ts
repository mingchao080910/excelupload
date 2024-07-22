import { Injectable } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Band } from './entities/band.entity';

@Injectable()
export class BandService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
  ) {}

  create(createBandDto: CreateBandDto) {
    const raw = this.bandRepository.create(createBandDto);
    return this.bandRepository.save(raw);
  }

  findAll() {
    return this.bandRepository.find({});
  }

  findOne(id: number) {
    return this.bandRepository.findOne({ where: { id } });
  }

  update(id: number, updateBandDto: UpdateBandDto) {
    return `This action updates a #${id} band`;
  }

  remove(raw: any) {
    return this.bandRepository.delete(raw);
  }
}
