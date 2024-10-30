import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeUserDTO, UpdateEmployeeDTO } from './dto';
import { CreateUserDTO } from '../users/dto';
import { Employee } from './entity';

@ApiTags('Employees')
@Controller('api/employees')
export class EmployeesController {
    constructor(
        private employeesService: EmployeesService,
        private usersService: UsersService
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
    async create(@Body() employee: CreateEmployeeUserDTO): Promise<any> {
        if (employee.password) {
            const user: CreateUserDTO = {
                email: employee.email,
                password: employee.password,
                role: employee.role
            };
            try {
                const newUser = await this.usersService.create(user);
                employee.user_id = newUser.id;
            } catch (error) {
                return new InternalServerErrorException(error.message);
            }
        }
        return await this.employeesService.create(employee);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    @ApiOperation({
        summary: 'Update employee',
        description: 'Update employee by id'
    })
    @ApiBearerAuth('JWT-auth')
    async update(@Body() employee: UpdateEmployeeDTO): Promise<any> {
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
}
