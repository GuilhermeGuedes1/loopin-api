import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomersDTO } from './dtos/customers';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomers(organizationId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const totalCustomers = await this.prisma.customer.count({
      where: {
        organizationId,
      },
    });

    const customers = await this.prisma.customer.findMany({
      where: {
        organizationId,
      },

      skip,
      take: limit,

      include: {
        visits: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },

        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const customersWithBusinessRules = customers.map((customer) => {
      const lastVisit = customer.visits[0];
      const today = new Date();

      const daysSinceLastVisit = lastVisit
        ? Math.floor(
            (today.getTime() - new Date(lastVisit.createdAt).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : null;
      const canContact =
        daysSinceLastVisit !== null && daysSinceLastVisit >= 14;

      return {
        ...customer,
        lastVisitAt: lastVisit?.createdAt ?? null,
        daysSinceLastVisit,
        canContact,
      };
    });

    return {
      customersWithBusinessRules,

      meta: {
        page,
        limit,
        total: totalCustomers,
        totalPages: Math.ceil(totalCustomers / limit),
      },
    };
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
