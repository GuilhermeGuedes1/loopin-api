import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomersDTO {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsString()
  @MinLength(10)
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(2)
  city!: string;

  @IsString()
  @MaxLength(2)
  state!: string;

  @IsString()
  @MinLength(2)
  country!: string;
}
