import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { UsersService } from "src/modules/users/users.service";
import { config } from 'dotenv';

export type JwtPayload = {
    sub: string;
    email: string;
};

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(UsersService)
        private readonly usersService: UsersService,
    ) {
        const extractJwtFromCookie = (req) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        }

        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwtFromCookie,
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersService.findOne(payload.sub);

        if (!user) throw new UnauthorizedException('Login to continue');

        return {
            id: payload.sub,
            email: payload.email,
        }
    }
}