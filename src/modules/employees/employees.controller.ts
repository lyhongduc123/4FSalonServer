import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDTO, QueryEmployeeDTO, UpdateEmployeeDTO } from './dto';
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
    async findAll(@Req() req: any): Promise<any[]> {
        return await this.employeesService.findAll();
    }

    @Get('search')
    @ApiOperation({ 
        summary: 'Find employee by where clause', 
        description: 'Find list of employee by where clause'
    })
    async findBy(@Query() where: QueryEmployeeDTO): Promise<any[]> {
        return await this.employeesService.findBy(where);
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Post()
    @ApiOperation({
        summary: 'Create employee',
        description: 'Create employee'
    })
    @ApiHeader({
        name: 'manager_branch_id',
        description: 'Manager can only create employee in his branch',
        required: false
    })
    @ApiBearerAuth('JWT-auth')
    async create(@Req() req: any, @Body() employee: CreateEmployeeDTO): Promise<any> {
        if (req.user.role === 'manager' && req.user.branch_id !== employee.branch_id) {
            throw new BadRequestException('Unavailable');
        }
        const branchExist = await this.branchesService.findOne(employee.branch_id);
        if (!branchExist) {
            throw new BadRequestException('Branch not found');
        }
        const newEmployee = await this.employeesService.create(employee, branchExist);
        return newEmployee;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Put(':id')
    @ApiOperation({
        summary: 'Update employee',
        description: 'Update employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async update(
        @Req() req: any,
        @Param('id', new ParseIntPipe()) id: number,
        @Body() employee: UpdateEmployeeDTO
    ): Promise<any> {
        if (req.user.role === 'manager' && req.user.branch_id !== employee.branch_id) {
           throw new BadRequestException('Unavailable');
        }
        employee.id = id;
        return await this.employeesService.update(employee);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete employee',
        description: 'Delete employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async remove(
        @Req() req: any,
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        const employee = await this.employeesService.findOne(id);
        if (!employee) {
            throw new BadRequestException('Employee not found');
        }
        if (req.user.role === 'manager' && req.user.branch_id !== employee.branch_id) {
            throw new BadRequestException('Unavailable');
        }
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
    async delete(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.employeesService.delete(id);
    }
}
