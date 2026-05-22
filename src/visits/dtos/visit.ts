import { Transform, TransformFnParams } from 'class-transformer';

import { IsDateString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitDTO {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Customer UUID',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsUUID()
  customerId!: string;

  @ApiProperty({
    example: '2026-05-22T14:00:00.000Z',
    description: 'Visit date in ISO format',
  })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }

    return value.trim();
  })
  @IsDateString()
  visitedAt!: string;
}
