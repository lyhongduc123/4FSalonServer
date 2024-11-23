import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SpecificOffDays, WorkingScheduleTemplate } from './entity';
import { SpecificOffDaysDTO, UpdateSpecificOffDaysDTO, UpdateWorkingScheduleTemplateDTO, WorkingScheduleTemplateDTO } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
    async findAllSpecificOffDays() {
        return await this.schedulesService.findAllSpecificOffDays();
    }

    @Get()
    async findAllWorkingScheduleTemplates() {
        return await this.schedulesService.findAllWorkingScheduleTemplates();
    }

    @Get('specific-off-days/search')
    @ApiQuery({ name: 'where', required: false })
    async findSpecificOffDays(@Query() query: SpecificOffDays) {
        return await this.schedulesService.findSpecificOffDays(query);
    }

    @Get('branch/:branch_id')
    async findWorkingScheduleTemplate(
        @Param('branch_id', new ParseIntPipe()) branch_id: number
    ) {
        return await this.schedulesService.findWorkingScheduleTemplateByBranch(branch_id);
    }

    @Get('specific-off-days/branch/:branch_id')
    async findSpecificOffDaysByBranch(
        @Param('branch_id', new ParseIntPipe()) branch_id: number
    ) {
        return await this.schedulesService.findSpecificOffDaysByBranch(branch_id);
    }

    @Post('specific-off-days')
    async createSpecificOffDays(@Body() createSpecificOffDays: SpecificOffDaysDTO) {
        return await this.schedulesService.createSpecificOffDays(createSpecificOffDays);
    }

    @Post()
    async createWorkingScheduleTemplate(@Body() createWorkingScheduleTemplate: WorkingScheduleTemplateDTO) {
        return await this.schedulesService.createWorkingScheduleTemplate(createWorkingScheduleTemplate);
    }

    @Put('specific-off-days')
    async updateSpecificOffDays(@Body() updateSpecificOffDays: UpdateSpecificOffDaysDTO) {
        return await this.schedulesService.updateSpecificOffDays(updateSpecificOffDays);
    }

    @Put()
    async updateWorkingScheduleTemplate(@Body() updateWorkingScheduleTemplate: UpdateWorkingScheduleTemplateDTO) {
        return await this.schedulesService.updateWorkingScheduleTemplate(updateWorkingScheduleTemplate);
    }

    @Delete('specific-off-days/:id')
    async deleteSpecificOffDays(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.schedulesService.deleteSpecificOffDays(id);
    }

    @Delete(':id')
    async deleteWorkingScheduleTemplate(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.schedulesService.deleteWorkingScheduleTemplate(id);
    }
}
