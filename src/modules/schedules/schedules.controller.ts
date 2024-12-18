import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SpecificOffDays, WorkingScheduleTemplate } from './entity';
import { SpecificOffDaysDTO, UpdateSpecificOffDaysDTO, UpdateWorkingScheduleTemplateDTO, WorkingScheduleTemplateDTO } from './dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../../common';

@ApiTags('Schedules')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
@ApiBearerAuth('JWT-auth')
@Controller('api/schedules')
export class SchedulesController {
    constructor(
        private schedulesService: SchedulesService
    ) {}

    @Get('specific-off-days')
    @ApiOperation({
        summary: 'Get all specific off days',
        description: 'Get all specific off days from the database'
    })
    async findAllSpecificOffDays() {
        return await this.schedulesService.findAllSpecificOffDays();
    }

    @Get()
    @ApiOperation({
        summary: 'Get all working schedule templates',
        description: 'Get all working schedule templates from the database'
    })
    async findAllWorkingScheduleTemplates() {
        return await this.schedulesService.findAllWorkingScheduleTemplates();
    }

    @Get('specific-off-days/search')
    @ApiOperation({
        summary: 'Search specific off days',
        description: 'Search specific off days in the database'
    })
    async findSpecificOffDays(@Query() query: SpecificOffDays) {
        return await this.schedulesService.findSpecificOffDays(query);
    }

    @Get('branch/:branch_id')
    @ApiOperation({
        summary: 'Get working schedule template by branch',
        description: 'Get working schedule template by branch from the database'
    })
    async findWorkingScheduleTemplate(
        @Param('branch_id', new ParseIntPipe()) branch_id: number
    ) {
        return await this.schedulesService.findWorkingScheduleTemplateByBranch(branch_id);
    }

    @Get('specific-off-days/branch/:branch_id')
    @ApiOperation({
        summary: 'Get specific off days by branch',
        description: 'Get specific off days by branch from the database'
    })
    async findSpecificOffDaysByBranch(
        @Param('branch_id', new ParseIntPipe()) branch_id: number
    ) {
        return await this.schedulesService.findSpecificOffDaysByBranch(branch_id);
    }

    @Post('specific-off-days')
    @ApiOperation({
        summary: 'Create specific off days',
        description: 'Create specific off days in the database'
    })
    async createSpecificOffDays(@Body() createSpecificOffDays: SpecificOffDaysDTO) {
        return await this.schedulesService.createSpecificOffDays(createSpecificOffDays);
    }

    @Post()
    @ApiOperation({
        summary: 'Create working schedule template',
        description: 'Create working schedule template in the database'
    })
    async createWorkingScheduleTemplate(@Body() createWorkingScheduleTemplate: WorkingScheduleTemplateDTO) {
        return await this.schedulesService.createWorkingScheduleTemplate(createWorkingScheduleTemplate);
    }

    @Put('specific-off-days/:id')
    @ApiOperation({
        summary: 'Update specific off days',
        description: 'Update specific off days in the database'
    })
    async updateSpecificOffDays(
        @Body() updateSpecificOffDays: UpdateSpecificOffDaysDTO,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        updateSpecificOffDays.id = id;
        return await this.schedulesService.updateSpecificOffDays(updateSpecificOffDays);
    }

    @Put()
    @ApiOperation({
        summary: 'Update working schedule template',
        description: 'Update working schedule template in the database'
    })
    async updateWorkingScheduleTemplate(@Body() updateWorkingScheduleTemplate: UpdateWorkingScheduleTemplateDTO) {
        return await this.schedulesService.updateWorkingScheduleTemplate(updateWorkingScheduleTemplate);
    }

    @Delete('specific-off-days/:id')
    @ApiOperation({
        summary: 'Delete specific off days',
        description: 'Delete specific off days in the database'
    })
    async deleteSpecificOffDays(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.schedulesService.deleteSpecificOffDays(id);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete working schedule template',
        description: 'Delete working schedule template in the database'
    })
    async deleteWorkingScheduleTemplate(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.schedulesService.deleteWorkingScheduleTemplate(id);
    }
}
