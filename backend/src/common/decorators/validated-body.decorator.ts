import { Body, ValidationPipe } from '@nestjs/common';

export const ValidatedBody = () =>
  Body(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );
