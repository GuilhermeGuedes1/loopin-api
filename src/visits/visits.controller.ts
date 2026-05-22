import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { VisitsService } from './visits.service';
import { CreateVisitDTO } from './dtos/visit';

import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

import { JwtAuthGuard } from 'src/auth/auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Visits')
@ApiBearerAuth()
@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @ApiOperation({
    summary: 'Create customer visit',
  })
  @ApiCreatedResponse({
    description: 'Visit created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('create')
  async createVisit(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateVisitDTO,
  ) {
    return this.visitsService.createVisit(user.organizationId, user.sub, body);
  }
}
