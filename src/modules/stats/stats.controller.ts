import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryStats } from './dtos/stats.dto';
import { JwtAuthGuard, Roles } from 'src/common';

@UseGuards(JwtAuthGuard)
@Roles('admin', 'manager')
@ApiBearerAuth('JWT-auth')
@ApiTags('Statistic')
@Controller('stats')
export class StatsController {
    constructor(
        private statsService: StatsService
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Get statistic',
        description: 'Heavy load api when data is large.'
    })
    async getCommonStat(
        @Req() req: any,
        @Query() query: QueryStats
    ) {
        return await this.statsService.getStat(query)
    }
}