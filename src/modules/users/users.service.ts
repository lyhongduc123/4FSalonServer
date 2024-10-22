import { Injectable } from '@nestjs/common';
import { User } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({
            id: id
        });
    }

    async create(user: CreateUserDTO): Promise<User> {
        const newUser = new User();
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.google_id = user.google_id;
        newUser.role = user.role;
        return this.usersRepository.save(newUser);
    }

    async update(): Promise<any> {
        return {};
    }

    async remove(): Promise<any> {
        return {};
    }

    async login(): Promise<any> {
        return {};
    }

    async logout(): Promise<any> {
        return {};
    }
}
