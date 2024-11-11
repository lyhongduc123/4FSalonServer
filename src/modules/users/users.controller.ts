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
    Patch,
    BadRequestException,
    Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from './../../common';
import { Roles } from './../../common/decorators';
import { RolesGuard } from './../../common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entity';
import { Request } from 'express';
import { CustomersService } from '../customers/customers.service';


@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
@ApiBearerAuth('JWT-auth')
@Controller('api/users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private customersService: CustomersService,
    ) {}

    @Get()
    @ApiOperation({ 
        summary: 'Get all users', 
        description: 'Get all users from the database'
    })
    async findAll(@Req() req: any): Promise<any[]> {
        return await this.usersService.findAll();
    }

    @Roles('admin', 'manager', 'customer')
    @Get('profile')
    @ApiOperation({ 
        summary: 'Get user profile', 
        description: 'Get user profile'
    })
    async profile(@Req() req: any): Promise<any> {
        if (req.user.role !== 'customer') {
            const user = await this.usersService.findOne(req.user.id);
            delete user.password;
            return user;
        }
        const customer = await this.customersService.findBy({ user_id: req.user.id });
        if (customer.length > 0) {
            const user = await this.usersService.findOne(req.user.id);
            const res = {
                name: customer[0].name,
                email: user.email,
                phone: customer[0].phone,
                points: customer[0].points,
                avatar: user.picture_url,
                isGoogleAccount: user.google_id ? true : false,
                avatar_url: user.picture_url || 'https://www.gravatar.com/avatar/',
            }
            delete user.password;
            return res
        }
        throw new BadRequestException('User not found');
    }
    
    @Get('search')
    @ApiOperation({ 
        summary: 'Get list of users by search', 
        description: 'Get a list of users by search from the database'
    })
    async findBy(@Query() where: any): Promise<any[]> {
        return await this.usersService.findBy(where.relation, where);
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
    
    @Post()
    @ApiOperation({ 
        summary: 'Create a user', 
        description: 'Create a user in the database'
    })
    async create(@Body() createUserDto: CreateUserDTO): Promise<any> {
        return await this.usersService.create(createUserDto);
    }

    @Put(':id')
    @ApiOperation({ 
        summary: 'Update a user', 
        description: 'Update a user in the database'
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() user: UpdateUserDTO
    ): Promise<any> {
        user.id = id;
        return await this.usersService.update(user);
    }

    @Roles('customer')
    @Patch('profile')
    @ApiOperation({ 
        summary: 'Update user profile', 
        description: 'Update user profile'
    })
    async updateProfile(
        @Req() req: any,
        @Body() user: { name: string, phone: string, picture_url: string }
    ): Promise<any> {
        if (req.user.role !== 'customer') {
            throw new BadRequestException('Unavailable');
        }
        const customer = await this.customersService.findBy({ user_id: req.user.id });
        if (customer.length === 0) {
            throw new BadRequestException('User not found');
        }
        await this.customersService.update({ user_id: req.user.id, ...user });
        return await this.profile(req);
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
