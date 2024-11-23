import { Controller,Req,Body, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VoucherHistoryService } from './voucherhistory.service';
import { QueryVoucherHistoryDTO, CreateVoucherHistoryDTO } from './dto';
import { JwtAuthGuard, Roles, RolesGuard } from './../../common';



@ApiTags('VoucherHistory')
@Controller('api/voucherhistory')
export class VoucherHistoryController {
    constructor(private voucherHistoryService: VoucherHistoryService) { }

    @Get('search')
    @ApiOperation({
        summary: 'Search voucher history',
        description: 'Search voucher history in the database'
    })
    async findBy(@Query() where: QueryVoucherHistoryDTO): Promise<any[]> {
        return await this.voucherHistoryService.findBy(where);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all voucher history',
        description: 'Get all voucher history from the database'
    })

    async findAll(): Promise<any[]> {
        return await this.voucherHistoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a voucher history',
        description: 'Get a voucher history from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.voucherHistoryService.findOne(id);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Post()
    @ApiOperation({
        summary: 'Create voucher history',
        description: 'Create voucher history'
    })
    @ApiBearerAuth('JWT-auth')
    async create(@Req() req: any, @Body() voucherHistory: CreateVoucherHistoryDTO): Promise<any> {
        const newVoucherHistory = await this.voucherHistoryService.create(voucherHistory);
        return newVoucherHistory;
    }

}