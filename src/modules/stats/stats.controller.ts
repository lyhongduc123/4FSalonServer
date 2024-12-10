import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryStats } from './dtos/stats.dto';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
@ApiBearerAuth('JWT-auth')
@ApiTags('Statistic')
@Controller('api/stats')
export class StatsController {
    constructor(
        private statsService: StatsService
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Get statistic',
        description: 'Heavy load api when data is large.'
    })
    @ApiResponse({ status: 200, description: 'Return list of statistic' })
    async getCommonStat(
        @Req() req: any,
        @Query() query: QueryStats
    ) {
        return await this.statsService.getStat(query)
    }
}