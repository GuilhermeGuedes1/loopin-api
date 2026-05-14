import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomersDTO } from './dtos/customers';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCustomers(@CurrentUser() user: AuthenticatedUser) {
    const users = await this.customersService.getCustomers(user.organizationId);
    return users;
  }
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async CreateCustomer(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateCustomersDTO,
  ) {
    console.log(user);
    return this.customersService.createCustomers(user.organizationId, body);
  }
}
