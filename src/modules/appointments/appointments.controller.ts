import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiResponse({ status: 200, description: 'Return list of appointments' })
    @ApiForbiddenResponse({ description: 'Not allowed! - Customer not allowed to find others appointment' })
    async findBy(
        @Req() req: any,
        @Query() where: QueryAppointmentDTO
    ): Promise<any[]> {
        if (req.user.role === 'customer' && 
            req.query.user_id &&
            req.user.id !== parseInt(req.query.user_id)
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
    @ApiResponse({ status: 200, description: 'Return an appointment' })
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
    @ApiResponse({ status: 201, description: 'Return the created appointment' })
    @ApiBadRequestResponse({ description: 'Not valid to create appointment (Customer user_id must be the same on appointment)' })
    @ApiConflictResponse({ description: 'Another appointment already exists at this time' })
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
    @ApiResponse({ status: 200, description: 'Return the updated appointment' })
    @ApiBadRequestResponse({ description: 'Id not provided' })
    @ApiForbiddenResponse({ description: 'Forbidden request' })
    @ApiNotFoundResponse({ description: 'Appointment not found' })
    async update(
        @Param('id', new ParseIntPipe()) id: number, 
        @Req() req: any,
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ): Promise<any> {
        updateAppointmentDTO.id = id;
        if (req.user.role === 'customer') {
            return await this.appointmentsService.updateSelf(req.user.id, updateAppointmentDTO);
        } else {
            return await this.appointmentsService.update(updateAppointmentDTO);
        }
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update an appointment status',
        description: 'Update an appointment status in the database * Requires Admin Role *'
    })
    @ApiResponse({ status: 200, description: 'Return the updated appointment' })
    @ApiBadRequestResponse({ description: 'Id not provided' })
    @ApiNotFoundResponse({ description: 'Appointment not found' })
    @ApiBadRequestResponse({ description: 'Invalid status' })
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
    @ApiResponse({ status: 200, description: 'Return message of success' })
    @ApiNotFoundResponse({ description: 'Appointment not found' })
    @ApiBadRequestResponse({ description: 'ID is required' })
    async remove(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        if (!id) throw new BadRequestException('ID is required');
        const appointment = await this.appointmentsService.findOne(id);
        if (!appointment) {
            throw new BadRequestException('Appointment not found');
        }
        await this.appointmentsService.remove(id);
        return { message: 'Appointment deleted successfully' };
    }
}
