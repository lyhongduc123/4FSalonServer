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
    Query,
    NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateProfileDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from './../../common';
import { Roles } from './../../common/decorators';
import { RolesGuard } from './../../common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

    @Get('search')
    @ApiOperation({ 
        summary: 'Get list of users by search', 
        description: 'Get a list of users by search from the database'
    })
    async find(@Query() where: any): Promise<any[]> {
        return await this.usersService.find(where);
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
                id: user.id,
                name: customer[0].name,
                email: user.email,
                phone: customer[0].phone,
                points: customer[0].points,
                booking_count: customer[0].booking_count,
                cancel_count: customer[0].cancel_count,
                avatar: user.picture_url,
                gender: customer[0].gender,
                isGoogleAccount: user.google_id ? true : false,
                avatar_url: user.picture_url || 'http://www.gravatar.com/avatar/?d=mp',
            }
            delete user.password;
            return res
        }
        throw new NotFoundException('Failed to get user profile');
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
    async create(@Body() createUserDTO: CreateUserDTO): Promise<any> {
        return await this.usersService.create(createUserDTO);
    }

    @Put(':id')
    @ApiOperation({ 
        summary: 'Update a user', 
        description: 'Update a user in the database'
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse({ description: 'Missing user id' })
    @ApiForbiddenResponse({ description: 'Admin role cannot be changed' })
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
    @ApiResponse({ status: HttpStatus.OK, description: 'Return the updated user profile' })
    @ApiBadRequestResponse({ description: 'Missing user id' })
    @ApiForbiddenResponse({ description: 'Forbidden request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiNotFoundResponse({ description: 'Customer not found' })
    async updateProfile(
        @Req() req: any,
        @Body() user: UpdateProfileDTO
    ): Promise<any> {
        const customer = await this.customersService.findBy({ user_id: req.user.id });
        if (customer.length === 0) {
            throw new NotFoundException('User not found');
        }

        await this.customersService.update({ ...customer[0], ...user });
        return await this.profile(req);
    }

    @Delete(':id')
    @ApiOperation({ 
        summary: 'Delete a user', 
        description: 'Delete a user in the database'
    })
    @ApiResponse({status: 200, description: 'User deleted' })
    async remove(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        if (!id) throw new BadRequestException('Missing user id');
        if (id === 1) throw new BadRequestException('Cannot delete the main admin');
        return await this.usersService.remove(id);
    }
}
