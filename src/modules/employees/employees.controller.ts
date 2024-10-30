import { Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeUserDTO } from './dto';
import { CreateUserDTO } from '../users/dto';

@ApiTags('Employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/employees')
export class EmployeesController {
    constructor(
        private employeesService: EmployeesService,
        private usersService: UsersService
    ) {}

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

    @Get('search')
    async findBy(where: any): Promise<any[]> {
        return await this.employeesService.findBy(where);
    }

    @Post()
    async create(employee: CreateEmployeeUserDTO): Promise<any> {
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

    @Put(':id')
    async update(employee: any): Promise<any> {
        return await this.employeesService.update(employee);
    }

    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.employeesService.remove(id);
    }
}
