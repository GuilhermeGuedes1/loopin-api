import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { CustomersService } from './customers.service';
import { CreateCustomersDTO } from './dtos/create-customer.dto';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { AuthenticatedUser } from 'src/auth/types/AuthenticatedUser';

@UseGuards(JwtAuthGuard)
@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @ApiOperation({
    summary: 'Search customers',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'ana',
  })
  @ApiOkResponse({
    description: 'Customers found successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get('search')
  async searchCustomers(
    @CurrentUser() user: AuthenticatedUser,
    @Query('search') search?: string,
  ) {
    return this.customersService.searchCustomers(user.organizationId, search);
  }

  @ApiOperation({
    summary: 'List customers',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'ana',
  })
  @ApiOkResponse({
    description: 'Customers fetched successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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

  @ApiOperation({
    summary: 'Create customer',
  })
  @ApiCreatedResponse({
    description: 'Customer created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('register')
  async createCustomer(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateCustomersDTO,
  ) {
    return this.customersService.createCustomers(user.organizationId, body);
  }
}
