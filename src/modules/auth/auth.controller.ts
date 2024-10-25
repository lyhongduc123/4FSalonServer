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
import { JwtAuthGuard } from './../../common';
import { Roles } from './../../common/decorators';
import { RolesGuard } from './../../common/guards';
import { CreateUserDTO } from '../users/dto';
import { LoginDTO, ChangePasswordDto, ForgotPasswordDto } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Roles('admin')
    @Post('change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(changePasswordDto);
    }

    /**
     * 
     * @param req 
     * @param forgotPasswordDto 
     * @returns 
     */
    @Post('forgot-password')
    async forgotPassword(@Req() req: Request, @Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }
}
