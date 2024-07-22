import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}
  create(createFeatureDto: CreateFeatureDto) {
    const raw = this.featureRepository.create(createFeatureDto);
    return this.featureRepository.save(raw);
  }

  findAll() {
    return this.featureRepository.find({});
  }

  findOne(id: number) {
    return this.featureRepository.findOne({ where: { id } });
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} feature`;
  }

  remove(raw: any) {

    return this.featureRepository.delete(raw);
  }
}
