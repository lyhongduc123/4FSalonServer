import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from '../appointments/appointments.service';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDTO } from './dto';
import { JwtAuthGuard, RolesGuard } from './../../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedbacks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('feedbacks')
export class FeedbacksController {
    constructor(
        private feedbacksService: FeedbacksService,
        private appointmentsService: AppointmentsService
    ) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.feedbacksService.findAll();
    }

    @Get('search')
    async findBy(@Query() where: any): Promise<any[]> {
        return await this.feedbacksService.findBy(where);
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.feedbacksService.findOne(id);
    }

    @Get('appointment/:id')
    async findByAppointment(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.feedbacksService.findBy({ appointment_id: id });
    }

    @Post()
    async create(@Body() feedback: CreateFeedbackDTO): Promise<any> {
        if (!feedback.appointment_id) {
            throw new BadRequestException('Appointment id not provided');
        }
        const newFeedback = await this.feedbacksService.create(feedback);
        await this.appointmentsService.update({id: feedback.appointment_id, feedback_id: newFeedback.id});

        return newFeedback;
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() feedback: CreateFeedbackDTO
    ): Promise<any> {
        feedback.id = id;
        return await this.feedbacksService.update(feedback);
    }


    @Delete(':id')
    async delete(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        await this.feedbacksService.delete(id)
        return { feedback_id: `${id}`, message: 'Feedback deleted successfully' };
    }
}
