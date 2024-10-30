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
    Put,
    Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { JwtAuthGuard } from './../../common';
import { Roles } from './../../common/decorators';
import { RolesGuard } from './../../common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entity';


@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('JWT-auth')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({ 
        summary: 'Get all users', 
        description: 'Get all users from the database'
    })
    async findAll(): Promise<any[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ 
        summary: 'Get user by id', 
        description: 'Get a user by id from the database'
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.usersService.findOne(id);
    }

    @Get('search')
    @ApiOperation({ 
        summary: 'Get list of users by search', 
        description: 'Get a list of users by search from the database'
    })
    async findBy(@Body() where: UserDTO): Promise<any[]> {
        return await this.usersService.findBy(where);
    }
    
    @Post()
    @ApiOperation({ 
        summary: 'Create a user', 
        description: 'Create a user in the database'
    })
    async create(@Body() createUserDto: CreateUserDTO): Promise<any> {
        return await this.usersService.create(createUserDto);
    }

    @Put()
    @ApiOperation({ 
        summary: 'Update a user', 
        description: 'Update a user in the database'
    })
    async update(@Body() user: UpdateUserDTO): Promise<any> {
        return await this.usersService.update(user);
    }

    @Delete(':id')
    @ApiOperation({ 
        summary: 'Delete a user', 
        description: 'Delete a user in the database'
    })
    async remove(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.usersService.remove(id);
    }
}
