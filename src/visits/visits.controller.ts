import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateVisitDTO } from './dtos/visit';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createVisit(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateVisitDTO,
  ) {
    return this.visitsService.createVisit(user, body);
  }
}
