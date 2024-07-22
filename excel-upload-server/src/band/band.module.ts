import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandController } from './band.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './entities/band.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Band])],
  controllers: [BandController],
  providers: [BandService],
})
export class BandModule {}
