import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dto/customer.dto';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { Admin } from 'typeorm';

@ApiTags('Customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Roles('admin')
    @Get()
    @ApiOperation({ 
        summary: 'Get all customers', 
        description: 'Get all customers from the database * Requires Admin Role *'
    })
    @ApiBearerAuth('Admin token')
    async findAll(): Promise<any[]> {
        return await this.customersService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a customer',
        description: 'Get a customer from the database'
    })
    @ApiBearerAuth('Admin token')
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.customersService.findOne(id);
    }

    @Roles('admin')
    @Get('search')
    @ApiOperation({
        summary: 'Search customers',
        description: 'Search customers in the database * Requires Admin Role *'
    })
    @ApiBearerAuth('Admin token')
    async findBy(@Body() where: any): Promise<any[]> {
        return await this.customersService.findBy(where);
    }

    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Create a customer',
        description: 'Create a customer in the database'
    })
    @ApiBearerAuth('Admin token')
    async create(@Body() customer: CreateCustomerDTO): Promise<any> {
        return await this.customersService.create(customer);
    }

    @Roles('admin')
    @Put(':id')
    @ApiOperation({
        summary: 'Update a customer',
        description: 'Update a customer in the database * Requires Admin Role *'
    })
    @ApiBearerAuth('Admin token')
    async update(@Body() customer: UpdateCustomerDTO): Promise<any> {
        return await this.customersService.update(customer);
    }

    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a customer',
        description: 'Delete a customer from the database * Requires Admin Role *'
    })
    @ApiBearerAuth('Admin token')
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.customersService.remove(id);
    }
}
