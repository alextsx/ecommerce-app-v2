import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UnauthorizedErrorFilter } from './common/filters/unauthorized-error.filter';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const port = configService.get('port');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UnauthorizedErrorFilter(configService));

  app.enableCors({
    origin: configService.get('corsOrigin'),
    credentials: true
  });

  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
