import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public comparePasswords({
    providedPassword,
    hashedPassword
  }: {
    providedPassword: string;
    hashedPassword: string;
  }): Promise<boolean> {
    return bcrypt.compare(providedPassword, hashedPassword);
  }

  public async checkCredentials({
    providedPassword,
    hashedPassword
  }: {
    providedPassword: string;
    hashedPassword: string;
  }): Promise<void> {
    const isPasswordValid = await this.comparePasswords({
      providedPassword,
      hashedPassword
    });

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
