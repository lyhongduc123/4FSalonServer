import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.employeesService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        ) id: number
    ): Promise<any> {
        return await this.employeesService.findOne(id);
    }

    @Get('find')
    async findBy(where: any): Promise<any[]> {
        return await this.employeesService.findBy(where);
    }

    @Post('create')
    async create(employee: any): Promise<any> {
        return await this.employeesService.create(employee);
    }

    @Put('update')
    async update(employee: any): Promise<any> {
        return await this.employeesService.update(employee);
    }

    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.employeesService.remove(id);
    }
}
