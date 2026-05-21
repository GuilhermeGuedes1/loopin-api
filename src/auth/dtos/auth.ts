import { Transform, TransformFnParams } from 'class-transformer';

import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDTO {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : '',
  )
  @IsString()
  @MinLength(3)
  name!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : '',
  )
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  @IsString()
  @MinLength(6)
  password!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone inválido',
  })
  phone!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  @IsString()
  @MinLength(2)
  organizationName!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone da organização inválido',
  })
  organizationPhone!: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : undefined,
  )
  @Matches(/^\d{11,14}$/, {
    message: 'Documento inválido',
  })
  organizationDocument!: string;
}

export class SigninDTO {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : undefined,
  )
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class MeResponseDTO {
  sub!: string;
  email!: string;
  name!: string;
  role!: string;
  organizationName!: string;
}
