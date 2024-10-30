import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Branches')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/branches')
export class BranchesController {
    constructor(private branchesService: BranchesService) {}

    @Get()
    async findAll(): Promise<any[]> {
        return await this.branchesService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<any> {
        return await this.branchesService.findOne(id);
    }

    @Get('search')
    async findBy(where: any): Promise<any[]> {
        return await this.branchesService.findBy(where);
    }

    @Roles('admin')
    @Post()
    async create(branch: any): Promise<any> {
        return await this.branchesService.create(branch);
    }

    @Roles('admin')
    @Put('id')
    async update(branch: any): Promise<any> {
        return await this.branchesService.update(branch);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(id: number): Promise<any> {
        return await this.branchesService.remove(id);
    }
}
