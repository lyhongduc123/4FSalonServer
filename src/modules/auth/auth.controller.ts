import { 
    Controller,
    Get,
    Req,
    Res,
    HttpStatus,
    UseGuards,
    Post,
    Body
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard, JwtAuthGuard } from './../../common';
import { CreateUserDTO } from '../users/dto';
import { LoginDTO } from './dto/login.dto';

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
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.loginWithGoogle(req.body);
        
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        })

        return res.status(HttpStatus.OK);
    }


    @Post('register')
    async register(@Body() createUserDTO: CreateUserDTO): Promise<any> {
        return this.authService.register(createUserDTO);
    }

    @Post('login')
    async login(@Body() user: LoginDTO): Promise<any> {
        return this.authService.login(user);
    }


}
