import { 
    Controller, 
    Get, 
    Param, 
    Req, 
    ParseIntPipe, 
    HttpStatus 
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    async findAll(@Req() req: Request): Promise<any[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        ) 
        id: number
    ): Promise<any> {
        return await this.usersService.findOne(id);
    }
}
