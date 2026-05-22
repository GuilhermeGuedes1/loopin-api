import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({
    example: 'Guilherme Guedes',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : '',
  )
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: 'guilherme@email.com',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : '',
  )
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @ApiProperty({
    example: '123456',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: '11999999999',
    description: 'Telefone somente números',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone inválido',
  })
  phone!: string;

  @ApiProperty({
    example: 'Loopin CRM',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  @IsString()
  @MinLength(2)
  organizationName!: string;

  @ApiProperty({
    example: '1133333333',
    description: 'Telefone da organização somente números',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone da organização inválido',
  })
  organizationPhone!: string;

  @ApiProperty({
    example: '12345678000190',
    description: 'CPF ou CNPJ somente números',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{11,14}$/, {
    message: 'Documento inválido',
  })
  organizationDocument!: string;
}

export class SigninDTO {
  @ApiProperty({
    example: 'admin@loopin.com',
  })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : undefined,
  )
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class MeResponseDTO {
  @ApiProperty({
    example: 'uuid-do-usuario',
  })
  sub!: string;

  @ApiProperty({
    example: 'admin@loopin.com',
  })
  email!: string;

  @ApiProperty({
    example: 'Guilherme Guedes',
  })
  name!: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  role!: string;

  @ApiProperty({
    example: 'Loopin CRM',
  })
  organizationName!: string;
}
