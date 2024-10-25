import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard, RolesGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.appointmentsService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
            ) 
        id: number
    ): Promise<any> {
        return await this.appointmentsService.findOne(id);
    }

    @Get('find')
    async findBy(where: any): Promise<any[]> {
        return await this.appointmentsService.findBy(where);
    }

    @Post('create')
    async create(appointment: any): Promise<any> {
        return await this.appointmentsService.create(appointment);
    }

    @Put('update')
    async update(appointment: any): Promise<any> {
        return await this.appointmentsService.update(appointment);
    }

    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.appointmentsService.remove(id);
    }
}
