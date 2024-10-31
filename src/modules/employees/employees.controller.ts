import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto';
import { BranchesService } from '../branches/branches.service';
import { Employee } from './entity';

@ApiTags('Employees')
@Controller('api/employees')
export class EmployeesController {
    constructor(
        private employeesService: EmployeesService,
        private branchesService: BranchesService
    ) {}

    @Get()
    @ApiOperation({ 
        summary: 'Get all employees', 
        description: 'Get all employees'
    })
    async findAll(): Promise<any[]> {
        return await this.employeesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ 
        summary: 'Get employee by id', 
        description: 'Get employee by id'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.employeesService.findOne(id);
    }

    @Get('search')
    @ApiOperation({ 
        summary: 'Find employee by where clause', 
        description: 'Find list of employee by where clause'
    })
    @ApiBody({ type: Employee })
    async findBy(@Body() where: any): Promise<any[]> {
        return await this.employeesService.findBy(where);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @ApiOperation({
        summary: 'Create employee',
        description: 'Create employee'
    })
    @ApiBearerAuth('JWT-auth')
    async create(@Body() employee: CreateEmployeeDTO): Promise<any> {
        const branchExist = await this.branchesService.findOne(employee.branch_id);
        if (!branchExist) {
            throw new BadRequestException('Branch not found');
        }
        const newEmployee = await this.employeesService.create(employee, branchExist);
        return newEmployee;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    @ApiOperation({
        summary: 'Update employee',
        description: 'Update employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() employee: UpdateEmployeeDTO
    ): Promise<any> {
        employee.id = id;
        return await this.employeesService.update(employee);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete employee',
        description: 'Delete employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.employeesService.remove(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete employee',
        description: 'Delete employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return await this.employeesService.delete(id);
    }
}
