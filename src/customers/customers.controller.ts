import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomersDTO } from './dtos/customers';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('search')
  async searchCustomers(
    @CurrentUser() user: AuthenticatedUser,
    @Query('search') search?: string,
  ) {
    return this.customersService.searchCustomers(user.organizationId, search);
  }

  @Get()
  async getCustomers(
    @CurrentUser() user: AuthenticatedUser,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.customersService.getCustomers(
      user.organizationId,
      Number(page) || 1,
      Number(limit) || 10,
      search,
    );
  }

  @Post('register')
  async createCustomer(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateCustomersDTO,
  ) {
    return this.customersService.createCustomers(user.organizationId, body);
  }
}
