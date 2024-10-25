import { Injectable } from '@nestjs/common';
import { User } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { IEntity } from './../../interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IEntity<User, CreateUserDTO, CreateUserDTO> {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User>;
    async findOne(email: string): Promise<User>;
    async findOne(google_id: string): Promise<User>;
    async findOne(identifier: number | string): Promise<User> {
        if (typeof identifier === 'number') {
            return this.usersRepository.findOneBy({ id: identifier });
        } else if (typeof identifier === 'string' && identifier.includes('@')) {
            return this.usersRepository.findOneBy({ email: identifier });
        } else {
            return this.usersRepository.findOneBy({ google_id: identifier });
        }
    }

    async findBy(where: any): Promise<User[]> {
        return this.usersRepository.find({ where });
    }

    async create(user: CreateUserDTO): Promise<User> {
        if (user.password !== undefined && user.password !== null && user.password !== '') {
            user.password = await this.hashPassword(user.password);
        }
        if (!user.role) {
            user.role = 'customer';
        }
        const newUser = await this.usersRepository.save(user);
        delete newUser.password;
        return newUser;
    }

    async update(user: UpdateUserDTO): Promise<User> {
        if (user.password !== undefined && user.password !== null && user.password !== '') {
            user.password = await this.hashPassword(user.password);
        }
        if (!user.role) {
            user.role = 'customer';
        }
        const updatedUser = await this.usersRepository.save(user);
        console.log(updatedUser);
        delete updatedUser.password;
        return updatedUser;
    }

    async remove(id: number): Promise<any> {
        await this.usersRepository.softDelete(
            { id: id }
        );
        return 'User deleted';
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(password, salt);
    }
}
