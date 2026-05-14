import { IsUUID } from 'class-validator';

export class CreateVisitDTO {
  @IsUUID()
  customerId!: string;
}
