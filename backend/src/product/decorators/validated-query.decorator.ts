import { Query, ValidationPipe } from '@nestjs/common';

export const ValidatedQuery = () =>
  Query(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
