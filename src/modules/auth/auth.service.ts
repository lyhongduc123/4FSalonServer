import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(UsersService)
        private readonly usersService: UsersService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        if (email === '' && password === '') {
            return Promise.reject(new Error('Email and password are required'));
        }

        const user = await this.usersService.findOne(email);
        if (!user) {
            return Promise.reject(new Error('User not found'));
        }
        const isPasswordValid = await this.usersService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return Promise.reject(new Error('Invalid password'));
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
                role: userExists.role,
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

    async register(user: CreateUserDTO) {
        try {
            const newUser = await this.usersService.create(user);
            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
                user: newUser.role,
            });
        } catch (error) {
            throw new BadRequestException('Email already exists');
        }
    }

    async logOut() {}

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

    async changePassword(changePasswordDto: ChangePasswordDto) {
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
            
        }

        return { message: 'Password reset email sent.' };
    }
}
