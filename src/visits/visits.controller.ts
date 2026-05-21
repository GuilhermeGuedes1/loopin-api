import { Controller, Post, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDTO } from './dtos/visit';

const DEV_ORGANIZATION_ID = 'af7572ed-98a6-4dde-ac4c-2b031d407b34';
const DEV_USER_ID = '1d88889e-423d-43c8-b537-8008b10fbdcf';

@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @Post('create')
  async createVisit(@Body() body: CreateVisitDTO) {
    return this.visitsService.createVisit(
      DEV_ORGANIZATION_ID,
      DEV_USER_ID,
      body,
    );
  }
}
