import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO, CustomerUserDTO } from 'src/modules/users/dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { CreateCustomerDTO } from 'src/modules/customers/dto/customer.dto';
import { register } from 'module';
import { AuthService } from '../auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(AuthService)
    private readonly authServices: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile

    const userExists = await this.usersService.findOne(emails[0].value);
    if (userExists) {
      if (!userExists.google_id) {
        userExists.picture_url = photos[0].value;
        userExists.google_id = profile.id;
        await this.usersService.update(userExists);
      }
      return done(null, userExists);
    }

    const user: CustomerUserDTO = {
      email: emails[0].value,
      phone: null,
      password: null,
      name: `${name.givenName} ${name.familyName}`,
      google_id: profile.id,
      picture_url: photos[0].value,
      role: 'customer',
    }
    const newUser = await this.authServices.registerWithGoogle(user);
    
    done(null, newUser);
  }
}