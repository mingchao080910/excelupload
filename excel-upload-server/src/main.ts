import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  console.log(join(__dirname,"../browser"))
  app.useStaticAssets(join(__dirname,"../browser"));  

  // E:\angularProject\ExcelUpload\dist\excel-upload
  await app.listen(3000);
}
bootstrap();
