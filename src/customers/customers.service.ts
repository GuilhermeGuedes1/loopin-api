import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomersDTO } from './dtos/customers';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomers(organizationId: string) {
    const users = await this.prisma.customer.findMany({
      where: {
        organizationId,
      },
      include: {
        visits: true,

        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return users;
  }

  async createCustomers(organizationId: string, data: CreateCustomersDTO) {
    const userAlreadyExists = await this.prisma.customer.findUnique({
      where: {
        organizationId_email: {
          organizationId,
          email: data.email,
        },
      },
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.customer.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }
}
