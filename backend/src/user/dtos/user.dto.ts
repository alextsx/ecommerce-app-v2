import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  @Exclude()
  id: string;
  @Exclude()
  role: $Enums.UserRole;
  email: string;
  @Exclude()
  password: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
