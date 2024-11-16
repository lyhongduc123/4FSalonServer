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
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    @ApiOperation({
        summary: 'Google Auth',
        description: 'Google authentication'
    })
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
            url: 'http://localhost:8080',
            statusCode: HttpStatus.OK,
        };
    }

    @Post('register')
    @ApiOperation({
        summary: 'Register',
        description: 'Register a new user * can only be customer *'
    })
    @ApiBadRequestResponse({ description: 'User already exists'})
    @ApiInternalServerErrorResponse({ description: 'Error creating user'})
    async register(@Body() customerUserDTO: CustomerUserDTO): Promise<any> {
        return this.authService.register(customerUserDTO);
    }

    @Post('login')
    @ApiOperation({ 
        summary: 'Login', 
        description: 'Login with email and password' 
    })
    async login(@Body() user: LoginDTO): Promise<any> {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Roles('admin')
    @Post('change-password')
    @ApiOperation({ 
        summary: 'Change password', 
        description: 'Change password of user' 
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiUnauthorizedResponse({ description: 'Invalid password' })
    @ApiResponse({ status: 200, description: 'Password changed successfully' })
    async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
        return this.authService.changePassword(changePasswordDTO);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
        return this.authService.forgotPassword(forgotPasswordDTO.email);
    }

    @Post('login-admin')
    @ApiOperation({ 
        summary: 'Login as admin', 
        description: 'Login as admin, if not admin, will return unauthorized' 
    })
    @ApiBadRequestResponse({ description: 'Invalid credentials' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' }) 
    async loginAdmin(@Body() user: LoginDTO): Promise<any> {
        return await this.authService.loginAdmin(user);
    }
}
