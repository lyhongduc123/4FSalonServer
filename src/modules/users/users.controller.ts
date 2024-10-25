import { 
    Controller, 
    Get, 
    Param, 
    Req, 
    ParseIntPipe, 
    HttpStatus,
    Post,
    Body,
    UseGuards,
    Delete,
    Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from './../../common';
import { Roles } from 'src/common/decorators';
import { RolesGuard } from './../../common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    async findAll(): Promise<any[]> {
        return await this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('find')
    async findBy(where: any): Promise<any[]> {
        return await this.usersService.findBy(where);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('create')
    async create(@Body() createUserDto: CreateUserDTO): Promise<any> {
        return await this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('update')
    async update(user: UpdateUserDTO): Promise<any> {
        return await this.usersService.update(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async remove(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        )
        id: number
    ): Promise<any> {
        return await this.usersService.remove(id);
    }
}
