import { 
    Controller,
    Get,
    Req,
    Res,
    HttpStatus,
    UseGuards,
    Post,
    Body,
    Redirect
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './../../common';
import { CreateUserDTO } from '../users/dto';
import { LoginDTO } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req: Request): Promise<any> {
        return this.authService.googleAuth(req);
    }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    @Redirect('http://localhost:3000', HttpStatus.OK)
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.loginWithGoogle(req.body);
        
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        })

        return {
            url: 'http://localhost:3000',
            statusCode: HttpStatus.OK,
        };
    }

    @Post('register')
    async register(@Body() createUserDTO: CreateUserDTO): Promise<any> {
        return this.authService.register(createUserDTO);
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'myhandle@gmail.com',
                },
                password: {
                    type: 'string',
                    example: 'password',
                }
            }
    }})
    @Post('login')
    async login(@Body() user: LoginDTO): Promise<any> {
        return this.authService.login(user);
    }


}
