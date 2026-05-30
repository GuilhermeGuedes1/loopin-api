import { ApiProperty } from '@nestjs/swagger';
import { TransformFnParams, Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  Matches,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateCustomersDTO {
  @ApiProperty({
    example: 'Ana',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({
    example: 'Souza',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  @MinLength(2)
  lastName!: string;

  @ApiProperty({
    example: '11999999999',
    description: 'Telefone somente números',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.replace(/\D/g, '');
  })
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone inválido',
  })
  phone!: string;

  @ApiProperty({
    example: 'ana@email.com',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim().toLowerCase();
  })
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @ApiProperty({
    example: 'São Paulo',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  city!: string;

  @ApiProperty({
    example: 'SP',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim().toUpperCase();
  })
  @IsString()
  @MaxLength(2)
  state!: string;

  @ApiProperty({
    example: 'Brasil',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  country!: string;
}
