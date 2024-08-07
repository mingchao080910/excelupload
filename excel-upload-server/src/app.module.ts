import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileManagementModule } from './file-management/file-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManagement } from './file-management/entities/file-management.entity';
import { PhoneModule } from './phone/phone.module';
import { BandModule } from './band/band.module';
import { FeatureModule } from './feature/feature.module';
import { Phone } from './phone/entities/phone.entity';
import { Feature } from './feature/entities/feature.entity';
import { Band } from './band/entities/band.entity';
@Module({
  imports: [
    FileManagementModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "aaa...000",
      database: 'test',
      entities: [FileManagement, Phone, Feature, Band],
      synchronize: true,
      // logging: true
    }),
    PhoneModule,
    BandModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
