import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCustomersDTO } from './dtos/customers';

import { CustomerResponseDTO } from './dtos/customers';

import { CustomersListResponseDTO } from './dtos/customers';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  private calculateDaysSince(date: Date) {
    const today = new Date();

    return Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  async searchCustomers(organizationId: string, search = '') {
    return this.prisma.customer.findMany({
      where: {
        organizationId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getCustomers(
    organizationId: string,
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<CustomersListResponseDTO> {
    const skip = (page - 1) * limit;

    const where = {
      organizationId,

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },

          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },

          {
            phone: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const totalCustomers = await this.prisma.customer.count({
      where,
    });

    const customers = await this.prisma.customer.findMany({
      where,

      skip,
      take: limit,

      include: {
        visits: {
          orderBy: {
            visitedAt: 'desc',
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

    const CONTACT_COOLDOWN_DAYS = 14;

    const data: CustomerResponseDTO[] = customers.map((customer) => {
      const lastVisit = customer.visits[0] as
        | { visitedAt: Date | null }
        | undefined;

      const lastVisitAt = lastVisit?.visitedAt ?? null;

      const daysSinceLastVisit = lastVisitAt
        ? this.calculateDaysSince(lastVisitAt)
        : null;

      const canContact =
        daysSinceLastVisit === null ||
        daysSinceLastVisit >= CONTACT_COOLDOWN_DAYS;

      const daysUntilContact =
        daysSinceLastVisit === null
          ? 0
          : Math.max(0, CONTACT_COOLDOWN_DAYS - daysSinceLastVisit);

      return {
        id: customer.id,

        name: customer.name,

        lastName: customer.lastName,

        email: customer.email,

        phone: customer.phone,

        city: customer.city,

        state: customer.state,

        country: customer.country,

        organization: {
          id: customer.organization.id,
          name: customer.organization.name,
        },

        lastVisitAt,

        daysSinceLastVisit,

        daysUntilContact,

        canContact,

        createdAt: customer.createdAt,
      };
    });

    return {
      data,

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
      throw new ConflictException('Customer already exists');
    }

    const customer = await this.prisma.customer.create({
      data: {
        ...data,
        organizationId,
      },
    });

    return {
      message: 'Customer created successfully',

      customer: {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    };
  }
}
