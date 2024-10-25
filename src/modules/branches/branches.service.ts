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
        return this.branchesRepository.save(branch);
    }

    async update(branch: UpdateBranchDTO): Promise<Branch> {
        return this.branchesRepository.save(branch);
    }

    async remove(id: number): Promise<any> {
        return this.branchesRepository.softDelete({ id });
    }

}
