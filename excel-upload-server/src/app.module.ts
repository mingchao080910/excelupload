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
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
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
