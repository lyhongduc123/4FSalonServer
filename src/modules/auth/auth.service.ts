import { Injectable } from '@nestjs/common';
import { access } from 'fs';

@Injectable()
export class AuthService {
    validateUser(email: string, password: string): Promise<any> {
        if (email === '' && password === '') {
            return Promise.reject(new Error('User not found'));
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            
        }
    }

    googleAuth(req: any) {
        if (!req.user) {
            return 'No user from google'
        }
        return {
            message: 'User information from google',
            user: req.user
        }
    }
}
