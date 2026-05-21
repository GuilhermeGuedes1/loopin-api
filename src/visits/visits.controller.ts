import { Controller, Post, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDTO } from './dtos/visit';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @Post('create')
  async createVisit(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateVisitDTO,
  ) {
    return this.visitsService.createVisit(user.organizationId, user.sub, body);
  }
}
