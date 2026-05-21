import { Transform, TransformFnParams } from 'class-transformer';

import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateCustomersDTO {
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  @MinLength(2)
  name!: string;

  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  @MinLength(2)
  lastName!: string;

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

  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim().toLowerCase();
  })
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsString()
  city!: string;

  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim().toUpperCase();
  })
  @IsString()
  @MaxLength(2)
  state!: string;

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
  id!: string;

  name!: string;

  lastName!: string;

  email!: string;

  phone!: string;

  city!: string;

  state!: string;

  country!: string;

  organization!: {
    id: string;
    name: string;
  };

  lastVisitAt!: Date | null;

  daysSinceLastVisit!: number | null;

  canContact!: boolean;

  createdAt!: Date;
}

export class CustomersListResponseDTO {
  data!: CustomerResponseDTO[];

  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
