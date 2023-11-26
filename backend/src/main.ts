import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UnauthorizedErrorFilter } from './common/filters/unauthorized-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new UnauthorizedErrorFilter());
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  /*   const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard()); */
  await app.listen(port);
}
bootstrap();
