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
import { CreateUserDTO, CustomerUserDTO } from '../users/dto';
import { LoginDTO, ChangePasswordDTO, ForgotPasswordDTO } from './dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


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
    @ApiBadRequestResponse({ description: 'User already exists'})
    @ApiInternalServerErrorResponse({ description: 'Error creating user'})
    async register(@Body() customerUserDTO: CustomerUserDTO): Promise<any> {
        return this.authService.register(customerUserDTO);
    }

    @Post('login')
    async login(@Body() user: LoginDTO): Promise<any> {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Roles('admin')
    @Post('change-password')
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiUnauthorizedResponse({ description: 'Invalid password' })
    @ApiResponse({ status: 200, description: 'Password changed successfully' })
    async changePassword(@Body() changePasswordDto: ChangePasswordDTO) {
        return this.authService.changePassword(changePasswordDto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('login-admin')
    @ApiUnauthorizedResponse({ description: 'Invalid password' }) 
    async loginAdmin(@Body() user: LoginDTO): Promise<any> {
        return await this.authService.loginAdmin(user);
    }
}
