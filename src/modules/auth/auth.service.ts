import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDTO } from './dto';
import { CreateCustomerDTO } from '../customers/dto/customer.dto';
import { CustomersService } from '../customers/customers.service';

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

    async register(user: any) {
        const userExists = await this.usersService.findOne(user.email);
        if (userExists) {
            return new BadRequestException('User already exists');
        }
        
        try {
            const userDTO: CreateUserDTO = {
                email: user.email,
                password: user.password,
                google_id: user.google_id,
                role: 'customer',
            };
            const newUser = await this.usersService.create(userDTO);

            const customerDTO: CreateCustomerDTO = {
                email: user.email,
                name: user.name,
                phone: user.phone,
                user_id: (await this.usersService.findOne(user.email)).id,
            };
            await this.customersService.create(customerDTO);
            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
                user: newUser.role,
            });
        } catch (error) {
            this.usersService.delete(user.id);
            return new InternalServerErrorException('Error creating user');
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
        if (userExists.role !== 'admin') {
            throw new UnauthorizedException('Unauthorized');
        }

        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
            role: userExists.role,
        });
    }
}
