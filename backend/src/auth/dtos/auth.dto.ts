import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginDto extends AuthDto {
  @IsNotEmpty()
  @IsBoolean()
  remember: boolean;
}

export class RegistrationDto extends AuthDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  last_name: string;
}
