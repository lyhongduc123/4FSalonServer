import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentStatusDTO, CreateAppointmentDTO, QueryAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { Appointment } from './entity';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
@ApiBearerAuth('JWT-auth')
@Controller('api/appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Get all appointments',
        description: 'Get all appointments from the database * Requires Admin Role *'
    })
    async findAll(@Req() req: any): Promise<any[]> {
        return await this.appointmentsService.findAll();
    }

    @Roles('admin', 'manager', 'customer')
    @Get('search')
    @ApiOperation({
        summary: 'Search appointments',
        description: 'Search appointments in the database * Requires logged in *'
    })
    async findBy(
        @Req() req: any,
        @Query() where: QueryAppointmentDTO
    ): Promise<any[]> {
        if (req.user.role === 'customer' && 
            req.query.user_id &&
            req.user.id !== req.query.user_id 
        ) {
            throw new ForbiddenException('Not allowed!');
        }

        return await this.appointmentsService.findBy(where);
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

    @Roles('admin', 'manager', 'customer')
    @Post()
    @ApiOperation({
        summary: 'Create an appointment',
        description: 'Create an appointment in the database * Requires logged in *'
    })
    async create(@Req() req: any, @Body() appointment: CreateAppointmentDTO): Promise<any> {
        if (req.user.role === 'customer' && req.user.id !== appointment.user_id) {
            throw new BadRequestException("Not valid to create appointment")
        }
        return await this.appointmentsService.create(appointment);;
    }

    @Roles('admin', 'manager', 'customer')
    @Put(':id')
    @ApiOperation({
        summary: 'Update an appointment',
        description: 'Update an appointment in the database * Requires logged in *'
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number, 
        @Req() req: any,
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ): Promise<any> {
        try {
            updateAppointmentDTO.id = id;
            if (req.user.role === 'customer') {
                return await this.appointmentsService.updateSelf(req.user.id, updateAppointmentDTO);
            } else {
                return await this.appointmentsService.update(updateAppointmentDTO);
            }
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
