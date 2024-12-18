import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Branch } from './entity';
import { CreateBranchDTO, UpdateBranchDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class BranchesService implements IEntity<Branch, CreateBranchDTO, UpdateBranchDTO> {
    constructor(
        @InjectRepository(Branch)
        private branchesRepository: Repository<Branch>,
    ) {}

    async findAll(): Promise<Branch[]> {
        return this.branchesRepository.find();    
    }

    async findOne(id: number): Promise<Branch> {
        return this.branchesRepository.findOneBy({ id });
    }

    async findBy(where: any): Promise<Branch[]> {
        return this.branchesRepository.findBy(where);
    }

    async create(branch: CreateBranchDTO): Promise<Branch> {
        const branchExist = await this.branchesRepository.findOne({
            where: { name: branch.name },
            withDeleted: true
        });
        if (branchExist) {
            throw new ConflictException('Branch already exist');
        }
        
        return this.branchesRepository.save(branch);
    }

    async update(branch: UpdateBranchDTO): Promise<Branch> {
        if (!branch.id) {
            throw new BadRequestException('Branch id is required');
        }
        const branchExist = await this.branchesRepository.findOneBy({ id: branch.id });
        if (!branchExist) {
            throw new NotFoundException('Branch not found');
        }
        return this.branchesRepository.save(branch);
    }

    async remove(id: number): Promise<any> {
        return this.branchesRepository.softDelete({ id });
    }

    async delete(id: number): Promise<any> {
        return this.branchesRepository.delete({ id });
    }
}
