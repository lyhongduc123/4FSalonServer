import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from '../appointments/appointments.service';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDTO } from './dto';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedbacks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/feedbacks')
export class FeedbacksController {
    constructor(
        private feedbacksService: FeedbacksService,
        private appointmentsService: AppointmentsService
    ) {}


    @Roles('customer', 'admin', 'manager')
    @Get()
    @ApiOperation({
        summary: 'Get all feedbacks',
        description: 'Get all feedbacks from the database'
    })
    async findAll(): Promise<any[]> {
        return await this.feedbacksService.findAll();
    }


    @Roles('customer', 'admin', 'manager')
    @Get('search')
    @ApiOperation({
        summary: 'Search feedbacks',
        description: 'Search feedbacks in the database'
    })
    async findBy(@Query() where: any): Promise<any[]> {
        return await this.feedbacksService.findBy(where);
    }


    @Roles('customer', 'admin', 'manager')
    @Get(':id')
    @ApiOperation({
        summary: 'Get a feedback',
        description: 'Get a feedback from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.feedbacksService.findOne(id);
    }


    @Roles('customer', 'admin', 'manager')
    @Get('appointment/:id')
    @ApiOperation({
        summary: 'Get feedbacks by appointment',
        description: 'Get feedbacks by appointment from the database'
    })
    async findByAppointment(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.feedbacksService.findBy({ appointment_id: id });
    }


    @Roles('customer')
    @Post()
    @ApiOperation({
        summary: 'Create a feedback',
        description: 'Create a feedback in the database'
    })
    @ApiResponse({ status: 201, description: 'Feedback has been created' })
    @ApiBadRequestResponse({ description: 'Appointment id not provided' })
    async create(@Body() feedback: CreateFeedbackDTO): Promise<any> {
        if (!feedback.appointment_id) {
            throw new BadRequestException('Appointment id not provided');
        }   
        const newFeedback = await this.feedbacksService.create(feedback);
        return newFeedback;
    }


    @Roles('admin', 'manager')
    @Put(':id')
    @ApiOperation({
        summary: 'Update a feedback',
        description: 'Update a feedback in the database'
    })
    @ApiBadRequestResponse({ description: 'Missing feedback id' })
    @ApiNotFoundResponse({ description: 'Feedback not found' })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() feedback: CreateFeedbackDTO
    ): Promise<any> {
        feedback.id = id;
        return await this.feedbacksService.update(feedback);
    }

    
    @Roles('admin', 'manager')
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a feedback',
        description: 'Delete a feedback in the database'
    })
    async delete(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        await this.feedbacksService.delete(id)
        return { feedback_id: `${id}`, message: 'Feedback deleted successfully' };
    }
}
