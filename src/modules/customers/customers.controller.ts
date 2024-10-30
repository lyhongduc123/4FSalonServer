import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dto/customer.dto';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.customersService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.customersService.findOne(id);
    }

    @Get('search')
    async findBy(where: any): Promise<any[]> {
        return await this.customersService.findBy(where);
    }

    @Post()
    async create(customer: CreateCustomerDTO): Promise<any> {
        return await this.customersService.create(customer);
    }

    @Put(':id')
    async update(customer: UpdateCustomerDTO): Promise<any> {
        return await this.customersService.update(customer);
    }

    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.customersService.remove(id);
    }
}
