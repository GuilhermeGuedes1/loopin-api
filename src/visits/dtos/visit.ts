import { Transform, TransformFnParams } from 'class-transformer';

import { IsDateString, IsUUID } from 'class-validator';

export class CreateVisitDTO {
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsUUID()
  customerId!: string;

  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsDateString()
  visitedAt!: string;
}
