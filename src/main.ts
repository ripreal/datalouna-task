import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from "dotenv";
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  console.log(`loading .env`)
  config({
    path: ".env"
  })

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configProvider = app.select(ConfigModule).get(ConfigService);
  await app.listen(configProvider.get(`PORT`),  () => {
    Logger.log(`App started with port ${configProvider.get(`PORT`)}`)
  });
}
bootstrap();
