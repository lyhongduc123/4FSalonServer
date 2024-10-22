import { 
    Controller,
    Get,
    Req
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(req.body);
    }

    @Get('google')
    async googleAuth(@Req() req: Request): Promise<any> {
        return this.authService.googleAuth(req);
    }

}
