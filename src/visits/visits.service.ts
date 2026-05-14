import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitDTO } from './dtos/visit';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}
  async createVisit(user: AuthenticatedUser, data: CreateVisitDTO) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: data.customerId,
        organizationId: user.organizationId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.prisma.visit.create({
      data: {
        customerId: data.customerId,
        organizationId: user.organizationId,
        createdById: user.sub,
      },
    });
  }
}
