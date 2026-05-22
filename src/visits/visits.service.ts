import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitDTO } from './dtos/visit';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async createVisit(
    organizationId: string,
    userId: string,
    data: CreateVisitDTO,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: data.customerId,
        organizationId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const visitedAt = new Date(data.visitedAt);
    const today = new Date();

    if (visitedAt > today) {
      throw new BadRequestException('Visit date cannot be in the future');
    }

    await this.prisma.visit.create({
      data: {
        customerId: data.customerId,
        organizationId,
        visitedAt: new Date(data.visitedAt),
        createdById: userId,
      },
    });

    return { message: 'Visit created successfully' };
  }
}
