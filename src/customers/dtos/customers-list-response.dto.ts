import { ApiProperty } from '@nestjs/swagger';
import { CustomerResponseDTO } from './customer-response.dto';

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

  constructor(prop: CustomersListResponseDTO) {
    Object.assign(this, prop);
  }
}
