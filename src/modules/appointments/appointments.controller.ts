import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentDTO, AppointmentStatusDTO, CreateAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { CustomersService } from '../customers/customers.service';
import { EmployeesService } from '../employees/employees.service';
import { Appointment } from './entity';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('JWT-auth')
@Controller('api/appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService,
        private customersService: CustomersService,
        private employeesService: EmployeesService
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Get all appointments',
        description: 'Get all appointments from the database * Requires Admin Role *'
    })
    async findAll(): Promise<any[]> {
        return await this.appointmentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get an appointment',
        description: 'Get an appointment from the database * Requires Admin Role *'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.appointmentsService.findOne(id);
    }

    @Roles('customer')
    @Get('search')
    @ApiOperation({
        summary: 'Search appointments',
        description: 'Search appointments in the database * Requires logged in *'
    })
    @ApiBody({ type: AppointmentDTO })
    async findBy(@Body() where: any): Promise<any[]> {
        return await this.appointmentsService.findBy(where);
    }

    @Roles('customer')
    @Post()
    @ApiOperation({
        summary: 'Create an appointment',
        description: 'Create an appointment in the database * Requires logged in *'
    })
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

    @Roles('customer')
    @Put(':id')
    @ApiOperation({
        summary: 'Update an appointment',
        description: 'Update an appointment in the database * Requires logged in *'
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number, 
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ): Promise<any> {
        try {
            updateAppointmentDTO.id = id;
            return await this.appointmentsService.update(updateAppointmentDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update an appointment status',
        description: 'Update an appointment status in the database * Requires Admin Role *'
    })
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
    @ApiOperation({
        summary: 'Delete an appointment',
        description: 'Delete an appointment from the database * Requires Admin Role *'
    })
    async remove(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.appointmentsService.remove(id);
    }
}
