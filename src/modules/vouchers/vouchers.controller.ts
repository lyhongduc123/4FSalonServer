import { Controller, Get,Param, ParseIntPipe,Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VouchersService } from './vouchers.service';
import { QueryVoucherDTO } from './dto';


@ApiTags('Vouchers')
@Controller('api/vouchers')
export class VouchersController {
    constructor(private vouchersService: VouchersService) { }


    
    @Get('search')
    @ApiOperation({
        summary: 'Search vouchers',
        description: 'Search vouchers in the database'
    })
    async findBy(@Query() where: QueryVoucherDTO): Promise<any[]> {
        return await this.vouchersService.findBy(where);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all vouchers',
        description: 'Get all vouchers from the database'
    })
    async findAll(): Promise<any[]> {
        return await this.vouchersService.findAll();
    }

    

    @Get(':id')
    @ApiOperation({
        summary: 'Get a voucher',
        description: 'Get a voucher from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.vouchersService.findOne(id);
    }
}
