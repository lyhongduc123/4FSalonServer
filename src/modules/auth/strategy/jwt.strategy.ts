import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { UsersService } from "./../../users/users.service";
import { config } from 'dotenv';

export type JwtPayload = {
    sub: string;
    email: string;
    role: string;
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
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        }
    }
}