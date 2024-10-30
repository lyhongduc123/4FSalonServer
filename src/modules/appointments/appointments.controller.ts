import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard, RolesGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentStatusDTO, CreateAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { CustomersService } from '../customers/customers.service';
import { EmployeesService } from '../employees/employees.service';
import { Appointment } from './entity';

@ApiTags('Appointments')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService,
        private customersService: CustomersService,
        private employeesService: EmployeesService
    ) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.appointmentsService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.appointmentsService.findOne(id);
    }

    @Get('search')
    async findBy(where: any): Promise<any[]> {
        return await this.appointmentsService.findBy(where);
    }

    @Post()
    async create(@Body() appointment: CreateAppointmentDTO): Promise<any> {
        if (!appointment.user_id) {
            throw new BadRequestException('User id not provided');
        }
        if (!appointment.employee_id) {
            throw new BadRequestException('Employee id not provided');
        }
        const customer = await this.customersService.findBy({
            user_id: appointment.user_id
        });
        if (!customer) {
            throw new BadRequestException('Customer not found');
        }
        const employee = await this.employeesService.findBy({
            id: appointment.employee_id
        });
        if (!employee) {
            throw new BadRequestException('Employee not found');
        }

        return await this.appointmentsService.create(appointment, customer[0], employee[0]);;
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id: number, 
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ): Promise<any> {
        try {
            return await this.appointmentsService.update(id, updateAppointmentDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Patch(':id')
    async patch(
        @Param('id', new ParseIntPipe()) id: number, 
        @Body() appointmentStatusDTO: AppointmentStatusDTO
    ): Promise<any> {
        try {
            return await this.appointmentsService.patch(id, appointmentStatusDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    async remove(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.appointmentsService.remove(id);
    }
}
