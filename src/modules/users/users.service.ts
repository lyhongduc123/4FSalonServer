import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async find(where: any): Promise<User[]> {
        let relation = false;
        if (where.relation) {
            relation = true;
            delete where.relation;
        }
        return this.usersRepository.find({
            where: where,
            relations: relation ? ['customer'] : []
        });
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

    async findBy(relation: Boolean, where: any): Promise<User[]> {
        relation ? where = { where: where, relations: ['customer', 'branch'] } : where = { where: where };
        return this.usersRepository.find(where);
    }

    async create(user: CreateUserDTO): Promise<User> {
        const userExists = await this.findOne(user.email);
        
        if (userExists) {
            throw new ConflictException('User already exists');
        }
        if (user.password !== undefined && user.password !== null && user.password !== '') {
            user.password = await this.hashPassword(user.password);
        }
        if (!user.role) {
            user.role = 'customer';
        }

        // Use save for return of the created user id
        const newUser = await this.usersRepository.save(user);
        delete newUser.password;
        return newUser;
    }

    async update(user: UpdateUserDTO): Promise<User> {
        if (!user.id) {
            throw new BadRequestException('Missing user id');
        }
        const userExists = await this.findOne(user.id);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }
        if (user.password) {
            user.password = await this.hashPassword(user.password);
        }
        if (userExists.role === 'admin' && user.role !== 'admin') {
            throw new ForbiddenException('Admin role cannot be changed');
        }
        const updatedUser = await this.usersRepository.save(user);
        delete updatedUser.password;
        return updatedUser;
    }

    async remove(id: number): Promise<any> {
        await this.usersRepository.softDelete(
            { id: id }
        );
        return 'User deleted';
    }

    async delete(id: number): Promise<any> {
        await this.usersRepository.delete(
            { id: id }
        );
        return 'User deleted';
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        if (!password && !hash) {
            return true;
        }
        if  (!password || !hash) {
            return false;
        }
        return bcrypt.compare(password, hash);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(password, salt);
    }
}
