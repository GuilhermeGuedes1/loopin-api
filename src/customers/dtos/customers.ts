import { Transform, TransformFnParams } from 'class-transformer';

import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

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

export class CustomerResponseDTO {
  @ApiProperty({
    example: 'uuid-do-customer',
  })
  id!: string;

  @ApiProperty({
    example: 'Ana',
  })
  name!: string;

  @ApiProperty({
    example: 'Souza',
  })
  lastName!: string;

  @ApiProperty({
    example: 'ana@email.com',
  })
  email!: string;

  @ApiProperty({
    example: '11999999999',
  })
  phone!: string;

  @ApiProperty({
    example: 'São Paulo',
  })
  city!: string;

  @ApiProperty({
    example: 'SP',
  })
  state!: string;

  @ApiProperty({
    example: 'Brasil',
  })
  country!: string;

  @ApiProperty({
    example: {
      id: 'organization-uuid',
      name: 'Loopin CRM',
    },
  })
  organization!: {
    id: string;
    name: string;
  };

  @ApiProperty({
    example: '2026-05-22T12:00:00.000Z',
    nullable: true,
  })
  lastVisitAt!: Date | null;

  @ApiProperty({
    example: 15,
    nullable: true,
  })
  daysSinceLastVisit!: number | null;

  @ApiProperty({
    example: true,
  })
  canContact!: boolean;

  @ApiProperty({
    example: 0,
    nullable: true,
  })
  daysUntilContact!: number | null;

  @ApiProperty({
    example: '2026-05-22T12:00:00.000Z',
  })
  createdAt!: Date;
}

export class CustomersListResponseDTO {
  @ApiProperty({
    type: [CustomerResponseDTO],
  })
  data!: CustomerResponseDTO[];

  @ApiProperty({
    example: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
    },
  })
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
