import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO, CustomerUserDTO } from '../users/dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDTO } from './dto';
import { CreateCustomerDTO } from '../customers/dto/customer.dto';
import { CustomersService } from '../customers/customers.service';
import { Roles } from 'src/common';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(UsersService)
        private readonly usersService: UsersService,
        private readonly customersService: CustomersService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        if (email === '' && password === '') {
            return new Error('Email and password are required');
        }

        const user = await this.usersService.findOne(email);
        if (!user) {
            return new Error('User not found');
        }
        const isPasswordValid = await this.usersService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return new Error('Invalid password');
        }
        return Promise.resolve(user);
    }

    async generateJwt(payload): Promise<{access_token: string}> {
        return {access_token: this.jwtService.sign(payload)};
    }

    async login(user: LoginDTO) {
        const userExists = await this.validateUser(user.email, user.password);

        if (userExists instanceof Error) {
            throw new BadRequestException(userExists.message);
        }
        if (userExists.role === 'admin') {
            return this.generateJwt({
                sub: userExists.id,
                email: userExists.email,
                role: 'customer',
            });
        }
        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
            role: userExists.role,
        });
    }

    async loginWithGoogle(user: any) {
        if (!user) {
            throw new BadRequestException('Unauthenticated');
        }

        return this.generateJwt({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
    }

    async registerWithGoogle(user: CreateUserDTO) {
        try {
            const newUser = await this.usersService.create(user);
            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
                user: newUser.role,
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async register(user: CustomerUserDTO) {
        const userExists = await this.usersService.findOne(user.email);
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        user.id = null;
        let user_id = null
        
        try {
            const userDTO: CreateUserDTO = {...user, role: 'customer'}
            const newUser = await this.usersService.create(userDTO)
            
            user_id = newUser.id

            const customerDTO: CreateCustomerDTO = {...user, user_id: newUser.id}
            const newCustomer = await this.customersService.create(customerDTO);

            newCustomer.user = newUser;

            return this.generateJwt ({
                sub: newUser.id,
                email: newUser.email,
                role: newUser.role
            })
        } catch (error) {
            if (user_id) await this.usersService.delete(user_id)
            console.log(user_id)
            throw new InternalServerErrorException('Error creating user');
        }
    }

    googleAuth(req: any) {
        if (!req.user) {
            return 'No user from google'
        }
        console.log(req.user);
        return {
            message: 'User information from google',
            user: req.user
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDTO) {
        const { oldPassword, newPassword } = changePasswordDto;
         
        const user = await this.usersService.findOne(changePasswordDto.email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const isPasswordValid = await this.usersService.comparePassword(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        user.password = newPassword;
        await this.usersService.update(user);
        return { message: 'Password changed successfully' };
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findOne(email)
        
        if (user) {
            this.generateJwt({
                sub: user.id,
                email: user.email,
                role: user.role,
            });
            await this.usersService.update(user);
        }

        return { message: 'Password reset email sent.' };
    }

    async loginAdmin(user: LoginDTO) {
        const userExists = await this.validateUser(user.email, user.password);
        
        if (userExists instanceof Error) {
            throw new BadRequestException("Wrong email or password");
        }
        if (userExists.role !== 'admin' && userExists.role !== 'manager') {
            throw new UnauthorizedException('Unauthorized');
        }

        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
            role: userExists.role,
        });
    }
}
