import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { UsersService } from "./../../users/users.service";
import { config } from 'dotenv';

export type JwtPayload = {
    sub: string;
    email: string;
    password: string;
    role: string;
};

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private usersService: UsersService,
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
        const user = await this.usersService.findOne(payload.email);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        
        if (payload.password !== user.password) {
            throw new UnauthorizedException('Invalid token');
        }
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        }
    }
}