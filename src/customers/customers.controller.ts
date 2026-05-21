import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomersDTO } from './dtos/customers';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

const DEV_ORGANIZATION_ID = 'af7572ed-98a6-4dde-ac4c-2b031d407b34';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getCustomers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.customersService.getCustomers(
      DEV_ORGANIZATION_ID,
      Number(page) || 1,
      Number(limit) || 10,
      search,
    );
  }
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async createCustomer(@Body() body: CreateCustomersDTO) {
    return this.customersService.createCustomers(DEV_ORGANIZATION_ID, body);
  }
}
