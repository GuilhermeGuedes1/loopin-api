import { ApiProperty } from '@nestjs/swagger';

export type CustomerResponseDTOProps = {
  customer: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    createdAt: Date;
    organization: {
      id: string;
      name: string;
    };
  };

  lastVisitAt: Date | null;
  daysSinceLastVisit: number | null;
  canContact: boolean;
  daysUntilContact: number | null;
};

export class CustomerResponseDTO {
  @ApiProperty({ example: 'uuid-do-customer' })
  id!: string;

  @ApiProperty({ example: 'Ana' })
  name!: string;

  @ApiProperty({ example: 'Souza' })
  lastName!: string;

  @ApiProperty({ example: 'ana@email.com' })
  email!: string;

  @ApiProperty({ example: '11999999999' })
  phone!: string;

  @ApiProperty({ example: 'São Paulo' })
  city!: string;

  @ApiProperty({ example: 'SP' })
  state!: string;

  @ApiProperty({ example: 'Brasil' })
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
    type: String,
    format: 'date-time',
  })
  lastVisitAt!: Date | null;

  @ApiProperty({ example: 15, nullable: true })
  daysSinceLastVisit!: number | null;

  @ApiProperty({ example: true })
  canContact!: boolean;

  @ApiProperty({ example: 0, nullable: true })
  daysUntilContact!: number | null;

  @ApiProperty({
    example: '2026-05-22T12:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt!: Date;

  constructor(data: CustomerResponseDTOProps) {
    this.id = data.customer.id;
    this.name = data.customer.name;
    this.lastName = data.customer.lastName;
    this.email = data.customer.email;
    this.phone = data.customer.phone;
    this.city = data.customer.city;
    this.state = data.customer.state;
    this.country = data.customer.country;

    this.organization = {
      id: data.customer.organization.id,
      name: data.customer.organization.name,
    };

    this.lastVisitAt = data.lastVisitAt;
    this.daysSinceLastVisit = data.daysSinceLastVisit;
    this.canContact = data.canContact;
    this.daysUntilContact = data.daysUntilContact;
    this.createdAt = data.customer.createdAt;
  }
}
