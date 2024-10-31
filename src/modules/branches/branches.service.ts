import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Branch } from './entity';
import { CreateBranchDTO, UpdateBranchDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        const branchExist = await this.branchesRepository.findOneBy(branch);
        if (branchExist) {
            throw new Error('Branch already exist');
        }
        const newBranch = this.branchesRepository.create(branch);
        return this.branchesRepository.save(newBranch);
    }

    async update(branch: UpdateBranchDTO): Promise<Branch> {
        if (!branch.id) {
            throw new Error('Branch id is required');
        }
        const branchExist = await this.branchesRepository.findOneBy({ id: branch.id });
        if (!branchExist) {
            throw new Error('Branch not found');
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
