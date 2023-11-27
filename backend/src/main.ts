import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UnauthorizedErrorFilter } from './common/filters/unauthorized-error.filter';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const configService = app.get<ConfigService<Config>>(ConfigService);
  app.useGlobalFilters(new UnauthorizedErrorFilter(configService));
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
