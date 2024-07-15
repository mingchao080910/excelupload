import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileManagementModule } from './file-management/file-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManagement } from './file-management/entities/file-management.entity';
@Module({
  imports: [
    FileManagementModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'aaa...000',
      database: 'test',
      entities: [FileManagement],
      synchronize: false,
      // logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
