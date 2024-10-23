import { 
    Controller, 
    Get, 
    Param, 
    Req, 
    ParseIntPipe, 
    HttpStatus,
    Post,
    Body,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto';
import { JwtAuthGuard } from './../../common';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Req() req: Request): Promise<any[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        ) 
        id: number
    ): Promise<any> {
        return await this.usersService.findOne(id);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(@Body() createUserDto: CreateUserDTO): Promise<any> {
        return await this.usersService.create(createUserDto);
    }
}
