import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  phone!: string;

  @IsString()
  @MinLength(2)
  organizationName!: string;

  @IsString()
  @MinLength(10)
  organizationPhone!: string;

  @IsString()
  @MinLength(11)
  organizationDocument!: string;
}

export class SigninDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
