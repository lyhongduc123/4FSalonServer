import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dto';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile

    const userExists = await this.usersService.findOne(emails[0].value);
    if (userExists) {
      userExists.google_id = profile.id;
      this.usersService.update(userExists);
      return done(null, userExists);
    }
    console.log(profile);

    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      google_id: profile.id,
      picture_url: photos[0].value,
    }
    const newUser: CreateUserDTO = {
      email: user.email,
      password: null,
      google_id: user.google_id,
      role: null
    };

    this.usersService.create(newUser);
    done(null, user);
  }
}